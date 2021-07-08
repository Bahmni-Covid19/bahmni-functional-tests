const {
    $,
    dropDown,
    button,
    within,
    highlight,
    toRightOf,
    write,
    goto,
    above,
    click,
    checkBox,
    toLeftOf,
    text,
    into,
    textBox,
    waitFor,
    confirm,
    accept,
    scrollDown,
    below,
    press,
} = require('taiko');
var _users = require("../util/users");
var _ndhm = require("../util/ndhm");
var assert = require("assert");
step("Open registration module", async function () {
    await highlight("Clinical")
    await click("Registration", toLeftOf("Programs"));
});

step("Initiate healthID association", async function () {
    await click("Verify Health ID");
});

step("Enter healthID generated with first name and last name", async function () {
    await click(textBox(toRightOf("Enter Health ID")));
    var firstName = _users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    console.log("FirstName" + firstName)
    gauge.message("FirstName" + firstName);

    var lastName = _users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    console.log("LastName" + lastName)
    gauge.message("LastName" + lastName);

    var patientHealthID = firstName+lastName+"@sbx";
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);

    await write(patientHealthID);
});

step("Enter patient first name <firstName>", async function (firstName) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
    {
        await write(firstName, into(textBox(toRightOf("Patient Name*"))));
    }
    gauge.message("firstName "+firstName)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)    
});

step("Enter patient middle name <middleName>", async function (middleName) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
    {
        await write(middleName, into(textBox({ "placeholder": "Middle Name" })));
    }
    gauge.message("middleName "+middleName)
    gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
});

step("Enter patient last name <lastName>", async function (lastName) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
    {
        await write(lastName, into(textBox({ "placeholder": "Last Name" })));
    }
    gauge.message("lastName "+lastName)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)    
});

step("Enter patient random first name", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    if(firstName==null||firstName=="")
    {
        firstName = _users.randomName(10)
        gauge.message("firstName "+firstName)
        gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    }    
    await write(firstName, into(textBox(toRightOf("Patient Name*"))));
});

step("Enter patient random middle name", async function () {
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName")
    if(middleName==null||middleName=="")
    {
        middleName = _users.randomName(10)
        gauge.message("middleName "+middleName)
        gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
    }
    await write(middleName, into(textBox({ "placeholder": "Middle Name" })));
});

step("Enter patient random last name", async function () {
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")
    if(lastName==null||firstName=="")
    {
        lastName = _users.randomName(10)
        gauge.message("lastName "+lastName)
        gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    }

    await write(lastName, into(textBox({ "placeholder": "Last Name" })));
});

step("Enter patient gender <gender>", async function (gender) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await dropDown("Gender *").select(gender);        
});

step("Enter age of the patient <age>", async function (age) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
    {
        await write(age, into(textBox(toRightOf("Years"))));
        await click(checkBox(toLeftOf("Estimated")));    
    }
});

step("Enter patient mobile number <mobile>", async function (mobile) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await write(mobile, into(textBox(toRightOf("Primary Contact"))));
    gauge.dataStore.scenarioStore.put("patientMobileNumber",mobile)
});

step("Click create new patient", async function () {
    await click("Create New")
});

step("Save the newly created patient", async function () {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await click("Save",{waitForEvents:['networkIdle']});
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);
});

step("Save the patient data", async function () {
    await click("Save",{waitForEvents:['networkIdle']});
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);
});

step("Select Mobile OTP", async function () {
    await waitFor("Preferred mode of Authentication")
    await dropDown("Preferred mode of Authentication").select("MOBILE_OTP");
});

step("Authenticate with Mobile", async function () {
    await _ndhm.interceptAuthInit(process.env.receptionist);
    await click(button("Authenticate"))
    await waitFor(async () => !(await $("overlay").exists()))
});
step("Open patient <patientID> details by search firstName <firstName> lastName <lastName> patientHealthID <patientHealthID>", 
async function (patientIdentifierValue, firstName, lastName, patientHealthID) {
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    if(patientHealthID!="")
        gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    gauge.dataStore.scenarioStore.put("patientIdentifier",patientIdentifierValue);
    await write(patientIdentifierValue, into(textBox({ "placeholder": "Enter ID" })))
    await press("Enter", {waitForNavigation:true});
});

step("Select the newly created patient", async function() {    
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
    await write(patientIdentifierValue)
    await press('Enter', {waitForNavigation:true});
    await waitFor(async () => !(await $("overlay").exists()))
})

step("Login as a receptionist with admin credentials location <location>", async function (location) {
    await waitFor(async () => !(await $("overlay").exists()))

    if(!(await text('BAHMNI EMR LOGIN').exists()))
    {
        await click(button({"class":"btn-user-info fr"}))
        await click('Logout',{waitForNavigation:true})        
    }

    await write(_users.getUserNameFromEncoding(process.env.receptionist), into(textBox(toRightOf("Username *"))));
    await write(_users.getPasswordFromEncoding(process.env.receptionist), into(textBox(toRightOf("Password *"))));
    await dropDown("Location").select(location);
    await click(button("Login"),{waitForNavigation:true});
});

step("Goto Bahmni home", async function () {
    await goto(process.env.bahmniHome,{waitForNavigation:true});
});

step("Create a new patient with verfication id", async function () {
    await click("Create New");
});

step("Enter registration fees <arg0>", async function (arg0) {
    await write("100", into(textBox(toRightOf("Registration Fees"))));
});

step("Go back to home page", async function () {
    await waitFor(async () => !(await $("overlay").exists()))
    await click($('.back-btn'),{waitForNavigation:true});
});

step("Verify if healthId entered already exists", async function () {
    await _ndhm.interceptFetchModes(process.env.receptionist)
    await _ndhm.interceptExistingPatients_WithPatientNotFound(process.env.receptionist,gauge.dataStore.scenarioStore.get("healthID"))
    await click(text("Verify", within($(".verify-health-id"))));
});

step("Enter OTP for health care validation <otp> for with new healthID, patient details and mobileNumber <patientMobileNumber>",
    async function (otp, patientMobileNumber) {
        await waitFor('Enter OTP')
        await write(otp, into(textBox(above("Confirm"))));  
        var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
        var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
        var healthID = gauge.dataStore.scenarioStore.get("healthID");
        var yearOfBirth = "2000";
        var gender = "F";
        const token = process.env.receptionist
        await _ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,patientMobileNumber);
        await _ndhm.interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender);

        await click(button("Confirm"))
    });

step("Enter visit details", async function() {
    await click(button("Enter Visit Details"),{waitForNavigation:true})
    await waitFor(async () => !(await $("overlay").exists()))    
});

step("Close visit", async function() {
    await confirm('Are you sure you want to close this visit?', async () => await accept())
    await click(button("Close Visit"),{waitForNavigation:true})
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Click on home page and goto registration module", async function () {
    await waitFor(async () => !(await $("overlay").exists()))
    await click($('.back-btn'),{waitForNavigation:true});
    await click('Registration',{waitForNavigation:true})
});

step("Click on home page", async function() {
    await waitFor(async () => !(await $("overlay").exists()))
    await click($('.back-btn'),{waitForNavigation:true});
});

step("Create new record", async function() {
    await waitFor(button("Create New Record"))
    await click(button("Create New Record"))
});

step("Update the verified HealthID", async function() {
    await waitFor(button("Update"))
	await click(button("Update"),{force: true})
});

step("Open newly created patient details by search", async function () {
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    console.log("patient Identifier "+patientIdentifierValue)
    gauge.message("patient Identifier "+patientIdentifierValue)

    await write(patientIdentifierValue, into(textBox({ "placeholder": "Enter ID" })))
    await press('Enter', {waitForNavigation:true});
    await waitFor(async () => !(await $("overlay").exists()))
});
step("Open newly created patient details by healthID", async function() {
    var patientHealthID = gauge.dataStore.scenarioStore.get("healthID")

    console.log("patient HealthID"+patientHealthID)
    gauge.message("patient HealthID"+patientHealthID)

    await write(patientHealthID, into(textBox({ "placeholder": "Enter ID" })))
    await press('Enter', {waitForNavigation:true});
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Verify correct patient form is open", async function() {
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
    assert.ok(await text(patientIdentifierValue).exists());
});

step("Enter village <village>", async function(village) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await write(village, into(textBox(toRightOf("Village"))))
});

step("Check if patient <firstName> <middleName> <lastName> with mobile <mobileNumber> exists", async function (firstName, middleName, lastName, arg2) {
    await write(firstName+" "+ middleName+" "+lastName, into(textBox({"placeholder" : "Enter Name"})));    
    await press("Enter");
});

step("Should not allow to associate HeatlhID if already linked1", async function() {
    await click(text("Verify", within($(".verify-health-id"))));
    await text("Matching record with Health ID found").exists();
});

step("Should fetch record with similar details", async function() {
	throw 'Unimplemented Step';
});

step("Save the newly created patient data", async function() {
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);

    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
    {
        await click("Save",{waitForEvents:['networkIdle']});
    }
});

step("Click create new patient if patient does not exist", async function() {
    gauge.dataStore.scenarioStore.put("isNewPatient",await text("No results found").exists())
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await click("Create New")
    else 
        await click("GAN",below("ID"))
});