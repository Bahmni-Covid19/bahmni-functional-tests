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
    scrollTo,
    radioButton
} = require('taiko');
var users = require("../../bahmni-e2e-common-flows/tests/util/users");
var ndhm = require("../util/ndhm");
var date = require("../../bahmni-e2e-common-flows/tests/util/date");
var taikoHelper = require("../../bahmni-e2e-common-flows/tests/util/taikoHelper");

var assert = require("assert");

step("To Associate a healthID, verify it", async function () {
    await click("Verify ABHA",{waitForNavigation:true,navigationTimeout:process.env.actionTimeout});
});

step("Enter random healthID details", async function () {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    var firstName = users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    console.log("FirstName" + firstName)
    gauge.message("FirstName" + firstName);

    var lastName = users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    console.log("LastName" + lastName)
    gauge.message("LastName" + lastName);
    
    gauge.dataStore.scenarioStore.put("patientMiddleName","")

    var patientHealthID = firstName+lastName+"@sbx";
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);

    await write(patientHealthID);
});

step("Enter healthID <healthID> for random patient name", async function (healthID) {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    var firstName = users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    console.log("FirstName" + firstName)
    gauge.message("FirstName" + firstName);

    var lastName = users.randomName(10)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    console.log("LastName" + lastName)
    gauge.message("LastName" + lastName);

    gauge.dataStore.scenarioStore.put("patientMiddleName","")

    var patientHealthID = healthID;
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);

    await write(patientHealthID);
});

step("Enter random healthID for existing patient details", async function () {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    console.log("FirstName" + firstName)
    gauge.message("FirstName" + firstName);

    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")
    console.log("LastName" + lastName)
    gauge.message("LastName" + lastName);

    gauge.dataStore.scenarioStore.put("patientMiddleName","")
    
    var patientHealthID = firstName+lastName+"@sbx";
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);

    await write(patientHealthID);
});

step("Enter healthID <healthID>", async function (patientHealthID) {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)
    console.log("healthID" + patientHealthID);
    gauge.message("healthID" + patientHealthID);
    await write(patientHealthID);
});

step("Select Mobile OTP", async function () {
    await waitFor("Preferred mode of Authentication")
    await dropDown("Preferred mode of Authentication").select("MOBILE_OTP");
});

step("Authenticate with Mobile", async function () {
    await ndhm.interceptAuthInit(process.env.receptionist);
    await click(button("Authenticate"))
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Login as a receptionist with admin credentials location <location>", async function (location) {
    await taikoHelper.repeatUntilNotFound($("#overlay"))
    if(await await button({"class":"btn-user-info"}).exists())
    {
        await click(button({"class":"btn-user-info"}))
        await click('Logout',{waitForNavigation:true,navigationTimeout:250000});
        await taikoHelper.repeatUntilNotFound($("#overlay"))
    }
    await write(users.getUserNameFromEncoding(process.env.receptionist), into(textBox({placeholder:"Enter your username"})));
    await write(users.getPasswordFromEncoding(process.env.receptionist), into(textBox({placeholder:"Enter your password"})));
    await dropDown("Location").select(process.env["OPD_location"]);
    await click(button("Login"),{waitForNavigation:true,navigationTimeout:250000});
    await taikoHelper.repeatUntilNotFound(text("BAHMNI EMR LOGIN"))
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Go back to home page", async function () {
    await taikoHelper.repeatUntilNotFound($("#overlay"))
    await click($('.back-btn'),{waitForNavigation:true});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Verify if healthId entered already exists", async function () {
    await ndhm.interceptFetchModes(process.env.receptionist)
    await ndhm.interceptExistingPatients(process.env.receptionist,gauge.dataStore.scenarioStore.get("healthID"))
    await click(text("Verify", within($(".verify-health-id"))));
});

step("Enter OTP for health care validation <otp> for with new healthID, patient details and mobileNumber <patientMobileNumber>",
async function (otp, patientMobileNumber) {
    await waitFor('Enter OTP')
    await write(otp, into(textBox(above("Fetch ABDM Data"))));  
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
    var healthID = gauge.dataStore.scenarioStore.get("healthID");
    var yearOfBirth = "2000";
    var gender = "F";
    const token = process.env.receptionist
    await ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,patientMobileNumber);
    await ndhm.interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender);

    await click(button("Fetch ABDM Data"))
});

step("Enter OTP for health care validation <otp> and fetch the existing patient details",
async function (otp) {
    await waitFor('Enter OTP')
    await write(otp, into(textBox(above("Fetch ABDM Data"))));  
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
    var healthID = gauge.dataStore.scenarioStore.get("healthID");
    var yearOfBirth = gauge.dataStore.scenarioStore.get("patientBirthYear");
    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    (gender == "Female") ? gender = "F": gender = "M";
    var patientMobileNumber = "+919876543210";
    const token = process.env.receptionist
    await ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,patientMobileNumber);
    // await ndhm.interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender);

    await click(button("Fetch ABDM Data"))
});

step("Update the verified HealthID", async function() {
    await waitFor(async () => (await button("Update").exists()))
	await click(button("Update"),{force: true})
});
step("Open newly created patient details by healthID", async function() {
    var patientHealthID = gauge.dataStore.scenarioStore.get("healthID")

    console.log("patient HealthID "+patientHealthID)
    gauge.message("patient HealthID"+patientHealthID)

    await write(patientHealthID, into(textBox({ "placeholder": "Enter ID" })))
    await press('Enter', {waitForNavigation:true});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Should not allow to associate HeatlhID if already linked1", async function() {
    await click(text("Verify", within($(".verify-health-id"))));
    await text("Matching record with Health ID found").exists();
});

step("Select the newly created patient with healthID", async function() {    
    var healthID = gauge.dataStore.scenarioStore.get("healthID")
    await write(healthID)
    await press('Enter', {waitForNavigation:true});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
})

step("Find match for NDHM record with firstName <firstName> middleName <middleName> lastName <lastName> age <age> gender <gender> mobileNumber <mobileNumber>", 
async function (firstName, middleName, lastName, age, gender, mobileNumber) {
    await waitFor('Enter OTP')
    await write("0000", into(textBox(above("Fetch ABDM Data"))));  
    var healthID = gauge.dataStore.scenarioStore.get("healthID");
    var patientMobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
    var _yearOfBirth = date.getDateYearsAgo(age)

    var yearOfBirth = _yearOfBirth.getFullYear();
    const token = process.env.receptionist
    await ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,mobileNumber);
    await ndhm.redirectExistingPatients(token, firstName,lastName,yearOfBirth,gender,mobileNumber);
    await click(button("Fetch ABDM Data"))
    await taikoHelper.repeatUntilNotFound($("#overlay"))
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
    // var createdMobileNumber = await textBox(toRightOf("Primary Contact")).value()
    assert.equal(createdFirstName,firstName,"First Name does not match")
//    assert.equal(createdMiddleName,middleName,"Middle Name does not match")
    assert.equal(createdLastName,lastName,"Last name does not match")
    assert.equal(createdGender,gender,"Gender does not match")
    // assert.equal(createdMobileNumber,mobileNumber,"Mobile number does not match")
    // var patientDetailsText = "NDHM Record: "+firstName+" "+lastName+", "+age+", "+patientGender+", "+mobileNumber
    // console.log(patientDetailsText)
    // assert.ok(await (await text(patientDetailsText).exists()))
});

step("Put healthID <healthID>", async function(healthID) {
    gauge.dataStore.scenarioStore.put("healthID",healthID);
});

step("Click on Confirm Selection", async function() {
    await click(button("Confirm Selection "));
});

step("Select the Existing Patient", async function() {
	var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
	await click(radioButton(toRightOf(firstName)));
});