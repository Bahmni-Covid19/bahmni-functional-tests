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
    link,
    below,
    press,
} = require('taiko');
var users = require("../util/users");
var ndhm = require("../util/ndhm");
var date = require("../util/date");

var assert = require("assert");
step("Open registration module", async function () {
    await highlight("Clinical")
    await click("Registration",{waitForNavigation:true,navigationTimeout:180000}, toLeftOf("Programs"));
    await waitFor(async () => !(await $("overlay").exists()))
});

step("To Associate a healthID, vefiy it", async function () {
    await click("Verify Health ID");
});

step("Enter random healthID details", async function () {
    await click(textBox(toRightOf("Enter Health ID")));
    var firstName = users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    console.log("FirstName" + firstName)
    gauge.message("FirstName" + firstName);

    var lastName = users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    console.log("LastName" + lastName)
    gauge.message("LastName" + lastName);

    var patientHealthID = firstName+lastName+"@sbx";
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);

    await write(patientHealthID);
});

step("Enter healthID <healthID>", async function (patientHealthID) {
    await click(textBox(toRightOf("Enter Health ID")));
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);
    await write(patientHealthID);
});

step("Enter patient random first name", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    if(firstName==null||firstName=="")
    {
        firstName = users.randomName(10)
        gauge.message("firstName "+firstName)
        gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    }    
    await write(firstName, into(textBox(toRightOf("Patient Name*"))));
});

step("Enter patient random middle name", async function () {
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName")
    if(middleName==null||middleName=="")
    {
        middleName = users.randomName(10)
        gauge.message("middleName "+middleName)
        gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
    }
    await write(middleName, into(textBox({ "placeholder": "Middle Name" })));
});

step("Enter patient random last name", async function () {
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")
    if(lastName==null||lastName=="")
    {
        lastName = users.randomName(10)
        gauge.message("lastName "+lastName)
        gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    }

    await write(lastName, into(textBox({ "placeholder": "Last Name" })));
});

step("Enter patient gender <gender>", async function (gender) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await dropDown("Gender *").select(gender); 
    gauge.dataStore.scenarioStore.put("patientGender",gender)
});

step("Enter age of the patient <age>", async function (age) {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
    {
        await write(age, into(textBox(toRightOf("Years"))));
        await click(checkBox(toLeftOf("Estimated")));    
    }
    gauge.dataStore.scenarioStore.put("patientAge",age)
});

step("Enter patient mobile number <mobile>", async function (mobile) {
    if(await text("Primary Contact").exists())
    {
        if(gauge.dataStore.scenarioStore.get("isNewPatient"))
            await write(mobile, into(textBox(toRightOf("Primary Contact"))));
        gauge.dataStore.scenarioStore.put("patientMobileNumber",mobile)
    }
});

step("Click create new patient", async function () {
    await click("Create New")
    gauge.dataStore.scenarioStore.put("isNewPatient",true)
});

step("Save the patient data", async function () {
    await click("Save",{waitForNavigation:true,navigationTimeout:180000});
    await waitFor(async () => !(await $("overlay").exists()))
    await waitFor(async () => (await $("#patientIdentifierValue").exists()))
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);
    console.log("patient Identifier "+patientIdentifier)
    gauge.message("patient Identifier "+patientIdentifier)
});

step("Save the newly created patient", async function () {
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await click("Save",{waitForEvents:['networkIdle']});
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);
});

step("Select Mobile OTP", async function () {
    await waitFor("Preferred mode of Authentication")
    await dropDown("Preferred mode of Authentication").select("MOBILE_OTP");
});

step("Authenticate with Mobile", async function () {
    await ndhm.interceptAuthInit(process.env.receptionist);
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
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
    await write(patientIdentifierValue)
    await press('Enter', {waitForNavigation:true});
    await waitFor(async () => !(await $("overlay").exists()))
})

step("Login as a receptionist with admin credentials location <location>", async function (location) {
    if(await button({"class":"btn-user-info"}).exists())
    {
        await click(button({"class":"btn-user-info"}))
        await click('Logout',{waitForNavigation:true})
    }
    await write(users.getUserNameFromEncoding(process.env.receptionist), into(textBox(toRightOf("Username *"))));
    await write(users.getPasswordFromEncoding(process.env.receptionist), into(textBox(toRightOf("Password *"))));
    await dropDown("Location").select(location);
    await click(button("Login"),{waitForNavigation:true,navigationTimeout:180000});
});

step("Goto Bahmni home", async function () {
    await goto(process.env.bahmniHome,{waitForNavigation:true,navigationTimeout:500000});
});

step("Enter registration fees <arg0>", async function (arg0) {
    await write("100", into(textBox(toRightOf("Registration Fees"))));
});

step("Go back to home page", async function () {
    await waitFor(async () => !(await $("overlay").exists()))
    await click($('.back-btn'),{waitForNavigation:true,navigationTimeout:180000});
});

step("Verify if healthId entered already exists", async function () {
    await ndhm.interceptFetchModes(process.env.receptionist)
    await ndhm.interceptExistingPatients(process.env.receptionist,gauge.dataStore.scenarioStore.get("healthID"))
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
    await ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,patientMobileNumber);
    await ndhm.interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender);

    await click(button("Confirm"))
});
    
step("Enter visit details", async function() {
    await click(button("Enter Visit Details"),{waitForNavigation:true})
    await waitFor(async () => !(await $("overlay").exists()))    
});

step("Close visit", async function() {
    await confirm('Are you sure you want to close this visit?', async () => await accept())
    await click(button("Close Visit"),{waitForNavigation:true,navigationTimeout:180000})
    await waitFor(async () => (await textBox({placeholder:"Enter ID"}).exists()))    
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
    if(gauge.dataStore.scenarioStore.get("isNewPatient"))
        await click("Save",{waitForEvents:['networkIdle']});
    var patientIdentifier = await $('#patientIdentifierValue').text();
        gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);    
});

step("Click create new patient if patient does not exist", async function() {
    if(await text("No results found").exists())
    {
        await click("Create New")
        gauge.dataStore.scenarioStore.put("isNewPatient",true)
    }
    else 
        await click(link(below("ID")))
});

step("Select the newly created patient with healthID", async function() {    
    var healthID = gauge.dataStore.scenarioStore.get("healthID")
    await write(healthID)
    await press('Enter', {waitForNavigation:true});
    await waitFor(async () => !(await $("overlay").exists()))
})

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

step("Find match for NDHM record with firstName <firstName> middleName <middleName> lastName <lastName> age <age> gender <gender> mobileNumber <mobileNumber>", 
async function (firstName, middleName, lastName, age, gender, mobileNumber) {
    await waitFor('Enter OTP')
    await write("0000", into(textBox(above("Confirm"))));  
    var healthID = gauge.dataStore.scenarioStore.get("healthID");
    var patientMobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
    var _yearOfBirth = date.getDateYearsAgo(age)

    var yearOfBirth = _yearOfBirth.getFullYear();
    const token = process.env.receptionist
    await ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,mobileNumber);
    await ndhm.redirectExistingPatients(token, firstName,lastName,yearOfBirth,gender,mobileNumber);
    await click(button("Confirm"))
    await waitFor(async () => !(await $("overlay").exists()))    
});

step("Should display Bahmni record with firstName <firstName> lastName <lastName> gender <gender> age <age> with mobile number <mobileNumber>", async function (firstName, lastName, gender, age, mobileNumber) {
    assert.ok(async () => (await $("Bahmni").exists()))
    assert.ok(await (await text(firstName+" "+lastName,below("Bahmni"),toRightOf("Name"))).exists())
    assert.ok(await (await text(gender,below("Bahmni"),toRightOf("Gender"))).exists())
    var _yearOfBirth = date.getDateYearsAgo(age)
    var yearOfBirth = _yearOfBirth.getFullYear();
    assert.ok(await (await text(yearOfBirth.toString(),below("Bahmni"),toRightOf("Year Of Birth"))).exists())
    assert.ok(await (await text(mobileNumber,below("Bahmni"),toRightOf("Phone"))).exists())
});

step("wait for <timeInMilliSeconds>", async function(timeInMilliSeconds) {
	await waitFor(timeInMilliSeconds)
});

step("Should display NDHM record with firstName <firstName> middleName <S> lastName <lastName> gender <gender> age <age> with mobile number <mobileNumber>", async function (firstName, arg5, lastName, gender, age, mobileNumber) {
    assert.ok(async () => (await $("NDHM").exists()))
    assert.ok(await (await text(firstName+" "+lastName,below("NDHM"),toRightOf("Name"))).exists())
    assert.ok(await (await text(gender,below("NDHM"),toRightOf("Gender"))).exists())
    var _yearOfBirth = date.getDateYearsAgo(age)
    var yearOfBirth = _yearOfBirth.getFullYear();
    assert.ok(await (await text(yearOfBirth.toString(),below("NDHM"),toRightOf("Year Of Birth"))).exists())
    assert.ok(await (await text(mobileNumber,below("NDHM"),toRightOf("Phone"))).exists())	
});


step("Should verify details of newly created record from NDHM - firstName <firstName> middleName <middleName> lastName <lastName> gender <gender> age <age> with mobile number <mobileNumber>", 
async function (firstName, middleName, lastName, gender, age, mobileNumber) {
    var createdFirstName = await textBox({placeholder:"First Name"}).value();
    var createdMiddleName = await textBox({placeholder:"Middle Name"}).value();
    var createdLastName = await textBox({placeholder:"Last Name"}).value()
    
    var createdGender = await dropDown("Gender *").value();
    var createdMobileNumber = await textBox(toRightOf("Primary Contact")).value()
    assert.equal(createdFirstName,firstName,"First Name does not match")
//    assert.equal(createdMiddleName,middleName,"Middle Name does not match")
    assert.equal(createdLastName,lastName,"Last name does not match")
    assert.equal(createdGender,gender,"Gender does not match")
    // assert.equal(createdMobileNumber,mobileNumber,"Mobile number does not match")
    // var patientDetailsText = "NDHM Record: "+firstName+" "+lastName+", "+age+", "+patientGender+", "+mobileNumber
    // console.log(patientDetailsText)
    // assert.ok(await (await text(patientDetailsText).exists()))
});