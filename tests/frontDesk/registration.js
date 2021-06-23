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
    press
} = require('taiko');
var _users = require("../util/users");
var _ndhm = require("../util/ndhm");

step("Open registration module", async function () {
    await highlight("Clinical")
    await click("Registration", toLeftOf("Programs"));
});

step("To Associate a healthID, vefiy it", async function () {
    await click("Verify Health ID");
});

step("Enter random healthID details", async function () {
    await click(textBox(toRightOf("Enter Health ID")));
    var firstName = _users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)

    var lastName = _users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)

    var patientHealthID = firstName+lastName+"@sbx";
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)

    await write(patientHealthID);
});

step("Enter patient random first name", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    if(firstName==null||firstName=="")
    {
        firstName = _users.randomName(10)
        gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    }    
    await write(firstName, into(textBox(toRightOf("Patient Name*"))));
});

step("Enter patient random middle name", async function () {
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName")
    if(middleName==null||firstName=="")
    {
        middleName = _users.randomName(10)
        gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
    }
    await write(middleName, into(textBox({ "placeholder": "Middle Name" })));
    gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
});

step("Enter patient random last name", async function () {
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")
    if(lastName==null||firstName=="")
    {
        lastName = _users.randomName(10)
        gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    }

    await write(lastName, into(textBox({ "placeholder": "Last Name" })));
});

step("Enter patient gender <gender>", async function (gender) {
    await dropDown("Gender *").select(gender);
});

step("Enter age of the patient <age>", async function (age) {
    await write(age, into(textBox(toRightOf("Years"))));
    await click(checkBox(toLeftOf("Estimated")));
});

step("Enter patient mobile number <mobile>", async function (mobile) {
    await write(mobile, into(textBox(toRightOf("Primary Contact"))));
    gauge.dataStore.scenarioStore.put("patientMobileNumber",mobile)
});

step("Click create new patient", async function () {
    await click("Create New")
});

step("Save the patient data", async function () {
    await click("Save",{waitForEvents:['networkIdle']});
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);
});

step("Fetch authentication modes", async function () {
    await _ndhm.interceptFetchModes(process.env.receptionist);
    await click(text("Verify", within($(".verify-health-id"))));
});

step("Select Mobile OTP", async function () {
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
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    gauge.dataStore.scenarioStore.put("patientIdentifier",patientIdentifierValue);
    await write(patientIdentifierValue, into(textBox({ "placeholder": "Enter ID" })))
    await click("Search", {waitForNavigation:true});
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
    await _ndhm.interceptExistingPatients(process.env.receptionist,gauge.dataStore.scenarioStore.get("healthID"))
});

step("Enter OTP for health care validation <otp> for with new healthID, patient details and mobileNumber <patientMobileNumber>",
    async function (otp, patientMobileNumber) {
        await waitFor(button('Confirm'))
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
});

step("Close visit", async function() {
    await confirm('Are you sure you want to close this visit?', async () => await accept())
    await click(button("Close Visit"))
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Log out", async function () {
    try
    {
        await click(button({"class":"btn-user-info fr"}))
        await click('Logout',{waitForNavigation:true})    
    }catch(e){}
});

step("Enter village <village>", async function(village) {
	await write(village, into(textBox(toRightOf("Village"))))
});

step("Click on home page and goto registration module", async function () {
    await waitFor(process.env.actionTimeout)
    await click($('.back-btn'),{waitForNavigation:true});
    await click('Registration',{waitForNavigation:true})
});

step("Click on home page", async function() {
    await waitFor(process.env.actionTimeout)
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