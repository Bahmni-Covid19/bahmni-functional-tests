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
    radioButton,
    timeField,
    evaluate,
    to
} = require('taiko');
var users = require("../../bahmni-e2e-common-flows/tests/util/users");
var ndhm = require("../util/ndhm");
var fileExtension = require("../../bahmni-e2e-common-flows/tests/util/fileExtension");
var date = require("../../bahmni-e2e-common-flows/tests/util/date");
var taikoHelper = require("../../bahmni-e2e-common-flows/tests/util/taikoHelper");
const { faker } = require('@faker-js/faker/locale/en_IND');
var assert = require("assert");

step("Click Verify ABHA button", async function () {
    await click("Verify ABHA", { waitForNavigation: true, navigationTimeout: process.env.actionTimeout });
});
step("Generate random patient data", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var patientGender = users.getRandomPatientGender();
    if (!firstName) {
        firstName = faker.name.firstName(patientGender).replace(" ", "");
        gauge.dataStore.scenarioStore.put("patientFirstName", firstName)
    }
    console.log("FirstName - " + firstName)
    gauge.message("FirstName - " + firstName);
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName")
    if (!middleName) {
        middleName = faker.name.middleName(patientGender).replace(" ", "");
        gauge.dataStore.scenarioStore.put("patientMiddleName", middleName)
    }
    console.log("middleName - " + middleName)
    gauge.message("middleName - " + middleName);
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")
    if (!lastName) {
        lastName = faker.name.lastName(patientGender).replace(" ", "");
        gauge.dataStore.scenarioStore.put("patientLastName", lastName)
    }
    console.log("LastName - " + lastName)
    gauge.message("LastName - " + lastName);
    gauge.dataStore.scenarioStore.put("patientFullName", `${firstName} ${middleName} ${lastName}`)
    var healthID = `${firstName}${lastName}@sbx`;
    gauge.dataStore.scenarioStore.put("healthID", healthID)
    gauge.message("ABHA ID - " + healthID);
    var yearOfBirth = faker.datatype.number({ min: new Date().getFullYear() - 100, max: new Date().getFullYear() });
    gauge.dataStore.scenarioStore.put("yearOfBirth", yearOfBirth)
    gauge.message("yearOfBirth - " + yearOfBirth);
    var monthOfBirth = faker.datatype.number({ min: 1, max: 12 })
    gauge.dataStore.scenarioStore.put("monthOfBirth", monthOfBirth)
    var dayOfBirth = faker.datatype.number({ min: 1, max: 28 })
    gauge.dataStore.scenarioStore.put("dayOfBirth", dayOfBirth)
    var buildingNumber = faker.address.buildingNumber()
    var patientAge = date.calculate_age(new Date(`${yearOfBirth.toString().padStart(2, "0")}-${monthOfBirth.toString().padStart(2, "0")}-${dayOfBirth.toString().padStart(2, "0")}`))
    gauge.dataStore.scenarioStore.put("patientAge", patientAge)
    gauge.dataStore.scenarioStore.put("buildingNumber", buildingNumber)
    var street = faker.address.street()
    gauge.dataStore.scenarioStore.put("street", street)
    var locality = faker.address.secondaryAddress()
    gauge.dataStore.scenarioStore.put("locality", locality)
    var city = faker.address.cityName()
    gauge.dataStore.scenarioStore.put("city", city)
    var fatherName = faker.name.firstName()
    gauge.dataStore.scenarioStore.put("fatherName", fatherName)
    var state = faker.address.state()
    gauge.dataStore.scenarioStore.put("state", state)
    await users.randomZipCodeStateAndDistrict();
    gauge.dataStore.scenarioStore.put("abhaNumber", faker.phone.number('##-####-####-####'))
    gauge.dataStore.scenarioStore.put("districtCode", faker.datatype.number(500))
    gauge.dataStore.scenarioStore.put("stateCode", faker.datatype.number(100))
    var patientMobileNumber = faker.phone.number('+919#########');
    gauge.dataStore.scenarioStore.put("patientMobileNumber", patientMobileNumber)
    gauge.message("patientMobileNumber - " + patientMobileNumber);
    gauge.dataStore.scenarioStore.put("profilePhotoB64", await users.downloadAndReturnBase64Image())
});

step("Enter random ABHA ID details", async function () {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    var patientHealthID = gauge.dataStore.scenarioStore.get("healthID")
    console.log("ABHA ID - " + patientHealthID);
    gauge.message("ABHA ID - " + patientHealthID);
    await write(patientHealthID);
});

step("Enter valid ABHA ID", async function () {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    var patientHealthID = users.getUserNameFromEncoding(process.env.PHR_user);
    gauge.dataStore.scenarioStore.put("healthID", patientHealthID)
    console.log("ABHA ID - " + patientHealthID);
    gauge.message("ABHA ID - " + patientHealthID);
    await write(patientHealthID);
});

step("Enter random healthID for existing patient details", async function () {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    var patientHealthID = gauge.dataStore.scenarioStore.get("healthID")
    console.log("ABHA ID - " + patientHealthID);
    gauge.message("ABHA ID - " + patientHealthID);
    await write(patientHealthID);
});

step("Enter healthID <healthID>", async function (patientHealthID) {
    await click(textBox(toRightOf("Enter ABHA/ABHA Address")));
    gauge.dataStore.scenarioStore.put("healthID", patientHealthID)
    console.log("ABHA ID - " + patientHealthID);
    gauge.message("ABHA ID - " + patientHealthID);
    await write(patientHealthID);
});

step("Select Mobile OTP", async function () {
    await waitFor("Preferred mode of Authentication")
    await dropDown("Preferred mode of Authentication").select("MOBILE_OTP");
});

step("Login as a receptionist with admin credentials location <location>", async function (location) {
    await taikoHelper.repeatUntilNotFound($("#overlay"))
    if (await await button({ "class": "btn-user-info" }).exists()) {
        await click(button({ "class": "btn-user-info" }))
        await click('Logout', { waitForNavigation: true, navigationTimeout: 250000 });
        await taikoHelper.repeatUntilNotFound($("#overlay"))
    }
    await write(users.getUserNameFromEncoding(process.env.receptionist), into(textBox({ placeholder: "Enter your username" })));
    await write(users.getPasswordFromEncoding(process.env.receptionist), into(textBox({ placeholder: "Enter your password" })));
    await dropDown("Location").select(process.env["OPD_location"]);
    await click(button("Login"), { waitForNavigation: true, navigationTimeout: 250000 });
    await taikoHelper.repeatUntilNotFound(text("BAHMNI EMR LOGIN"))
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Go back to home page", async function () {
    await taikoHelper.repeatUntilNotFound($("#overlay"))
    await click($('.back-btn'), { waitForNavigation: true });
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Click Verify button", async function () {
    await ndhm.interceptFetchModes(process.env.receptionist)
    await ndhm.interceptExistingPatients(process.env.receptionist, gauge.dataStore.scenarioStore.get("healthID"))
    await click(text("Verify", within($(".verify-health-id"))));
});

step("Enter OTP for health care validation <otp> and fetch the existing patient details",
    async function (otp) {
        await waitFor('Enter OTP')
        await write(otp, into(textBox(above("Fetch ABDM Data"))));
        var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
        var lastName = `${gauge.dataStore.scenarioStore.get("patientMiddleName")} ${gauge.dataStore.scenarioStore.get("patientLastName")}`
        var healthID = gauge.dataStore.scenarioStore.get("healthID");
        var yearOfBirth = gauge.dataStore.scenarioStore.get("yearOfBirth");
        var gender = users.getRandomPatientGender().charAt(0);
        var patientMobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
        const token = process.env.receptionist
        await ndhm.interceptAuthConfirmforExistingPatient(token, healthID, firstName, lastName, yearOfBirth, gender, patientMobileNumber);
        // await ndhm.interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender);
        await click(button("Fetch ABDM Data"))
    });

step("Update the verified HealthID", async function () {
    await waitFor(async () => (await button("Update").exists()))
    await click(button("Update"), { force: true })
});
step("Open newly created patient details by healthID", async function () {
    var patientHealthID = gauge.dataStore.scenarioStore.get("healthID")

    console.log("patient HealthID " + patientHealthID)
    gauge.message("patient HealthID" + patientHealthID)

    await write(patientHealthID, into(textBox({ "placeholder": "Enter ID" })))
    await press('Enter', { waitForNavigation: true });
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Should not allow to associate HeatlhID if already linked1", async function () {
    await click(text("Verify", within($(".verify-health-id"))));
    await text("Matching record with Health ID found").exists();
});

step("Select the newly created patient with healthID", async function () {
    var healthID = gauge.dataStore.scenarioStore.get("healthID")
    await write(healthID)
    await press('Enter', { waitForNavigation: true });
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
        await ndhm.interceptAuthConfirmForNewPatient(token, healthID, firstName, lastName, yearOfBirth, gender, mobileNumber);
        await ndhm.redirectExistingPatients(token, firstName, lastName, yearOfBirth, gender, mobileNumber);
        await click(button("Fetch ABDM Data"))
        await taikoHelper.repeatUntilNotFound($("#overlay"))
    });

step("Should display NDHM record with firstName <firstName> middleName <S> lastName <lastName> gender <gender> age <age> with mobile number <mobileNumber>", async function (firstName, arg5, lastName, gender, age, mobileNumber) {
    assert.ok(async () => (await $("NDHM").exists()))
    assert.ok(await (await text(firstName + " " + lastName, below("NDHM"), toRightOf("Name"))).exists())
    assert.ok(await (await text(gender, below("NDHM"), toRightOf("Gender"))).exists())
    var _yearOfBirth = date.getDateYearsAgo(age)
    var yearOfBirth = _yearOfBirth.getFullYear();
    assert.ok(await (await text(yearOfBirth.toString(), below("NDHM"), toRightOf("Year Of Birth"))).exists())
    assert.ok(await (await text(mobileNumber, below("NDHM"), toRightOf("Phone"))).exists())
});


step("Should verify details of newly created record from NDHM - firstName <firstName> middleName <middleName> lastName <lastName> gender <gender> age <age> with mobile number <mobileNumber>",
    async function (firstName, middleName, lastName, gender, age, mobileNumber) {
        var createdFirstName = await textBox({ placeholder: "First Name" }).value();
        var createdMiddleName = await textBox({ placeholder: "Middle Name" }).value();
        var createdLastName = await textBox({ placeholder: "Last Name" }).value()

        var createdGender = await dropDown("Gender *").value();
        // var createdMobileNumber = await textBox(toRightOf("Primary Contact")).value()
        assert.equal(createdFirstName, firstName, "First Name does not match")
        //    assert.equal(createdMiddleName,middleName,"Middle Name does not match")
        assert.equal(createdLastName, lastName, "Last name does not match")
        assert.equal(createdGender, gender, "Gender does not match")
        // assert.equal(createdMobileNumber,mobileNumber,"Mobile number does not match")
        // var patientDetailsText = "NDHM Record: "+firstName+" "+lastName+", "+age+", "+patientGender+", "+mobileNumber
        // console.log(patientDetailsText)
        // assert.ok(await (await text(patientDetailsText).exists()))
    });

step("Put healthID <healthID>", async function (healthID) {
    gauge.dataStore.scenarioStore.put("healthID", healthID);
});

step("Click on Confirm Selection", async function () {
    await click(button("Confirm Selection "), { waitForNavigation: true, navigationTimeout: process.env.actionTimeout });
});
step("Select the Existing Patient", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
    await scrollTo($("//BUTTON//STRONG[contains(text(),'" + firstName + "')]"));
    await click($("//BUTTON//STRONG[contains(text(),'" + firstName + "')]"));
});

step("Create new record", async function () {
    await waitFor(button("Create New Record"))
    await evaluate($(`//button[normalize-space()='Create New Record']`), (el) => el.click())
});


step("Should not allow to associate HeatlhID if already linked1", async function () {
    await click(text("Verify", within($(".verify-health-id"))));
    await text("Matching record with Health ID found").exists();
});

step("Click patient queue button", async function () {
    await click("Patient Queue", { waitForNavigation: true, navigationTimeout: process.env.actionTimeout });
});

step("Verify the token number and patient details are displayed", async function () {
    var tokenNumber = gauge.dataStore.scenarioStore.get("patientTokenNumber")
    var abhaID = users.getUserNameFromEncoding(process.env.PHR_user)
    assert.ok(await text("ABHA Address: " + abhaID, toRightOf(tokenNumber)).exists())
});

step("Click Register button", async function () {
    var tokenNumber = gauge.dataStore.scenarioStore.get("patientTokenNumber")
    var abhaID = users.getUserNameFromEncoding(process.env.PHR_user)
    await click(button("Register"), toRightOf(text("ABHA Address: " + abhaID, toRightOf(tokenNumber))));
});


step("Enter Aadhaar number <000000000000>", async function (aadharNumber) {
    await write(aadharNumber, into(textBox(toRightOf("Enter AADHAAR Number"))))
});


step("Enter OTP <00000> for Aadhaar verification", async function (otp) {
    await write(otp, into(textBox(toLeftOf("Confirm"), within($(".abha-creation")))))
});

step("Click on Proceed", async function () {
    await click(button("Proceed"), { waitForNavigation: true, navigationTimeout: process.env.actionTimeout });
    await waitFor(2000)
});

step("Click Create ABHA button", async function () {
    await click(button("Create ABHA"), { waitForNavigation: true, navigationTimeout: process.env.actionTimeout });
});

step("Enter mobile no", async function () {
    //await write(mobileNo, into(textBox(toRightOf("Enter Mobile Number"))))
    await write(gauge.dataStore.scenarioStore.get("patientMobileNumber"), into(textBox(toRightOf("Enter Mobile Number"))))
});

step("Click on Verify", async function () {
    await ndhm.interceptAadhaarGenerateMobileOtp()
    await click(button({ name: 'verify-btn' }, toRightOf("Enter Mobile Number")), { waitForNavigation: true, navigationTimeout: process.env.actionTimeout });
});

step("Click Accept & Proceed button for aadhaar verification", async function () {
    await ndhm.interceptAadhaarGenerateOtp()
    await click(button("Accept & Proceed"));
});

step("Click on Confirm to verify Aadhaar otp", async function () {
    await ndhm.interceptAadhaarVerifyOtpNoNoAndAddress()
    await click(button("Confirm"));
});

step("Click on Create Abha adddress", async function () {
    await ndhm.interceptPhrAddressExist()
    await click(button("Create ABHA Address"))
});

step("Enter abha address", async function () {
    var patientHealthID = gauge.dataStore.scenarioStore.get("healthID").split("@")[0]
    await write(patientHealthID, into(textBox(toRightOf("Enter new ABHA ADDRESS "))))
});


step("Click on create", async function () {
    await ndhm.interceptPhrLinked()
    await ndhm.interceptExistingPatientForAbhaAddress()
    await click(button("Create"), below("Click on the check box to make the above abha-address as a default"));
});

step("Enter OTP <000000> for Mobile verification", async function (otp) {
    await write(otp, into(textBox(toLeftOf("Confirm"))))
});

step("Click on Confirm to verify  Mobile otp", async function () {
    await ndhm.interceptAadhaarVerifyMobileOtp()
    await ndhm.interceptCreateHealthIdByAadhaar()
    await click(button("Confirm"));
});

step("Click on Create New Record button", async function () {
    await ndhm.interceptNdhmDemographics()
    await click(button("Create New Record"));
});

async function VerifyDetailsOnRegistrationPage() {
    var actualfullName = gauge.dataStore.scenarioStore.get("patientFirstName") + gauge.dataStore.scenarioStore.get("patientMiddleName") + gauge.dataStore.scenarioStore.get("patientLastName")
    var expectedFullName = await textBox({ placeholder: "First Name" }).value() + await textBox({ placeholder: "Middle Name" }).value() + await textBox({ placeholder: "Last Name" }).value()
    assert.equal(actualfullName, expectedFullName)
    var expecteddateOfBirth = gauge.dataStore.scenarioStore.get("yearOfBirth") + "-" + String(gauge.dataStore.scenarioStore.get("monthOfBirth")).padStart(2, '0') + "-" + String(gauge.dataStore.scenarioStore.get("dayOfBirth")).padStart(2, '0')
    var actualdateOfBirth = await timeField(toRightOf("Date of Birth")).value();
    assert.equal(actualdateOfBirth, expecteddateOfBirth)
    var actualstate = await textBox(toRightOf("State ")).value();
    var expectedState = gauge.dataStore.scenarioStore.get("state")
    assert.equal(actualstate, expectedState)
    var actualdistrict = await textBox(toRightOf("District ")).value();
    var expectedDistrict = gauge.dataStore.scenarioStore.get("district")
    assert.equal(actualdistrict, expectedDistrict)
    var actualpincode = await textBox(toRightOf("Pin Code ")).value();
    var expectedPincode = gauge.dataStore.scenarioStore.get("pincode")
    assert.equal(actualpincode, expectedPincode)
    var expectedabhaAddress = gauge.dataStore.scenarioStore.get("healthID")
    var actualAbhaAddress = await textBox(toRightOf("ABHA Address")).value();
    assert.equal(actualAbhaAddress, expectedabhaAddress)
    var actualphoneNumber = await textBox(toRightOf("Phone Number ")).value()
    var expectedPhoneNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber")
    assert.equal(actualphoneNumber, expectedPhoneNumber)
}

step("Verify details on Registration page for verify abha flow", async function () {
    VerifyDetailsOnRegistrationPage()
});

step("Verify details on Registration page for create abha flow", async function () {
    VerifyDetailsOnRegistrationPage()
    var actualabhaNumber = await textBox(toRightOf("ABHA Number")).value();
    var expectedAbhaNumber = gauge.dataStore.scenarioStore.get("abhaNumber")
    assert.equal(expectedAbhaNumber, actualabhaNumber)
});

async function VerifyABDMRecordDisplayed(strBody) {
    return strBody.replace('<fullName>', gauge.dataStore.scenarioStore.get("patientFirstName") + " " + gauge.dataStore.scenarioStore.get("patientMiddleName") + " " + gauge.dataStore.scenarioStore.get("patientLastName"))
        .replace('<age>', gauge.dataStore.scenarioStore.get("patientAge"))
        .replace('<gender>', gauge.dataStore.scenarioStore.get("patientGender").toLowerCase())
        .replace('<address>', gauge.dataStore.scenarioStore.get("buildingNumber") + " " + gauge.dataStore.scenarioStore.get("street") + ", " + gauge.dataStore.scenarioStore.get("locality") + ", " + gauge.dataStore.scenarioStore.get("city") + ", " + gauge.dataStore.scenarioStore.get("district") + ", " + gauge.dataStore.scenarioStore.get("state") + ", " + gauge.dataStore.scenarioStore.get("pincode"))
        .replace('<addressVerifyFlow>', gauge.dataStore.scenarioStore.get("district") + ", " + gauge.dataStore.scenarioStore.get("state"))
        .replace('<addressVerifyFlowForExistingPatient>', gauge.dataStore.scenarioStore.get("district") + ", " + gauge.dataStore.scenarioStore.get("state") + ", " + gauge.dataStore.scenarioStore.get("pincode"))
        .replace('<mobile>', gauge.dataStore.scenarioStore.get("patientMobileNumber").slice(3))
        .replace('<mobileNumber>', gauge.dataStore.scenarioStore.get("patientMobileNumber"))
        .replace('<abhaAddress>', gauge.dataStore.scenarioStore.get("healthID"))
        .replace('<abhaNumber>', gauge.dataStore.scenarioStore.get("abhaNumber"))
}
step("Verify ABDM record displayed on create abha flow", async function () {
    var expectedAbdmRecord = await VerifyABDMRecordDisplayed(fileExtension.parseContent("./data/confirm/abdmRecordForCreateAbhaFlow.txt"))
    var actualAbdmRecord = await $("//B[normalize-space()='ABDM Record:']//following-sibling::P").text()
    assert.equal(actualAbdmRecord, expectedAbdmRecord)
});
step("Verify ABDM record displayed on verify abha flow", async function () {
    var expectedAbdmRecord = await VerifyABDMRecordDisplayed(fileExtension.parseContent("./data/confirm/abdmRecordForVerifyAbhaFlow.txt"))
    var actualAbdmRecord = await $("//B[normalize-space()='ABDM Record:']//following-sibling::P").text()
    assert.equal(actualAbdmRecord, expectedAbdmRecord)
});

step("Verify ABDM record displayed on verify abha flow for existing patient", async function () {
    var expectedAbdmRecord = await VerifyABDMRecordDisplayed(fileExtension.parseContent("./data/confirm/abdmRecordForVerifyAbhaFlowForExistingpatient.txt"))
    var actualAbdmRecord = await $("//B[normalize-space()='ABDM Record:']//following-sibling::P").text()
    assert.equal(actualAbdmRecord, expectedAbdmRecord)
});
step("Verify abha number created successfully", async function () {
    assert.ok(await text("ABHA Created Successfully").exists())
    assert.ok(await text(gauge.dataStore.scenarioStore.get("abhaNumber")).exists())
});

async function verifyAadhaarDetails() {
    assert.ok(await text(gauge.dataStore.scenarioStore.get("patientFirstName") + " " + gauge.dataStore.scenarioStore.get("patientMiddleName") + " " + gauge.dataStore.scenarioStore.get("patientLastName"), toRightOf("Full Name:")).exists())
    assert.ok(await text(gauge.dataStore.scenarioStore.get("patientGender").charAt(0), toRightOf("Gender:")).exists())
    assert.ok(await text(gauge.dataStore.scenarioStore.get("dayOfBirth") + "-" + gauge.dataStore.scenarioStore.get("monthOfBirth") + "-" + gauge.dataStore.scenarioStore.get("yearOfBirth"), toRightOf("DOB:")).exists())
    assert.ok(await text(gauge.dataStore.scenarioStore.get("buildingNumber") + " " + gauge.dataStore.scenarioStore.get("street") + ", " + gauge.dataStore.scenarioStore.get("locality") + ", " + gauge.dataStore.scenarioStore.get("district") + ", " + gauge.dataStore.scenarioStore.get("state") + ", " + gauge.dataStore.scenarioStore.get("pincode"), toRightOf("Address:")).exists())
}

step("Verify Aadhaar details", async function () {
    await verifyAadhaarDetails();
});

step("Accept all the consent checkboxes in ABHA screen", async function () {
    await checkBox(toLeftOf("confirm that I have duly informed and explained")).check();
    await checkBox(toLeftOf("have been explained about the consent")).check();
    await write(gauge.dataStore.scenarioStore.get("patientFullName"), into(textBox({ placeholder: 'Beneficiary name' })))
});

step("Click on Confirm to verify Aadhaar otp for existing Abha Number", async function () {
    await ndhm.interceptAadhaarVerifyOtpExistingABHANo()
    await click(button("Confirm"));
});

step("Verify Aadhaar details with ABHA Number", async function () {
    await verifyAadhaarDetails();
    assert.ok(await text(gauge.dataStore.scenarioStore.get("abhaNumber"), toRightOf("ABHA Number:")).exists())
});

step("Click on Link Abha Address button", async function () {
    await click(button("Link ABHA Address"));
});

step("Enter Mobile Number/Email", async function () {
    await write(gauge.dataStore.scenarioStore.get("patientMobileNumber"), into(textBox(toRightOf("Enter Mobile Number / Email"))))
});

step("Click on Verify to link Abha Address", async function () {
    await ndhm.interceptEmailPhoneInit();
    await click(text("Verify", within($(".abha-creation"))));
});


step("Click on Confirm to verify Mobile otp to link Abha Address", async function () {
    var strBody = {
        "mobileEmail": gauge.dataStore.scenarioStore.get("patientMobileNumber"),
        "mappedPhrAddress": [
            gauge.dataStore.scenarioStore.get("healthID")
        ]
    }
    await ndhm.interceptPreVerification(strBody);
    await click(button("Confirm"));
});

step("Choose Abha Address to link", async function () {
    await click(button(gauge.dataStore.scenarioStore.get("healthID")));
});

step("Click on Verify button to verify abha number", async function () {
    await ndhm.interceptAuthMethods();
    await click(text("Verify", within($(".abha-creation"))));
});

step("Click on Authenticate to enter aadhaar otp", async function () {
    await ndhm.interceptInitTransaction()
    await click(button("Authenticate"));
});

step("Click on Confirm to authenticate aadhaar otp", async function () {
    var strBody = { "mappedPhrAddress": [] }
    await ndhm.interceptPreVerification(strBody);
    await ndhm.interceptHID();
    await click(button("Confirm"));
});

step("Intercept get token for ABHA ID", async function () {
    await ndhm.interceptGetUserToken();
});

step("Click on Confirm to verify Aadhaar otp for matching record found", async function () {
    await ndhm.interceptAadhaarVerifyOtpMatchingRecord()
    await click(button("Confirm"));
});

step("Verify Aadhaar details with ABHA Number and ABHA Address", async function () {
    await verifyAadhaarDetails();
    assert.ok(await text(gauge.dataStore.scenarioStore.get("abhaNumber"), toRightOf("ABHA Number:")).exists())
    assert.ok(await text(gauge.dataStore.scenarioStore.get("healthID"), toRightOf("ABHA Address:")).exists())
});

step("Click on matching record found link", async function () {
    await scrollTo(text("Matching record with " + gauge.dataStore.scenarioStore.get("healthID") + " found"));
    await click(text("Matching record with " + gauge.dataStore.scenarioStore.get("healthID") + " found"));
});

step("Verify matching record found with the selected Abha Address", async function () {
    assert.ok(await text("Matching record with " + gauge.dataStore.scenarioStore.get("healthID") + " found. Please proceed to update the record", above("Proceed")).exists())
});

step("Verify Aadhaar details with ABHA Number and ABHA Adress", async function () {
    await verifyAadhaarDetails();
    assert.ok(await text(gauge.dataStore.scenarioStore.get("abhaNumber"), toRightOf("ABHA Number:")).exists())
    assert.ok(await text(gauge.dataStore.scenarioStore.get("healthID"), toRightOf("ABHA Address:")).exists())
});

step("Click on Confirm to verify Aadhaar otp for existing Abha Number and Abha Address", async function () {
    await ndhm.interceptAadhaarVerifyOtpExistingABHANoABHAAddress()
    await click(button("Confirm"));
});
step("Select <AuthType> Authentication Type", async function (AuthType) {
    await waitFor("Preferred mode of Authentication")
    await dropDown("Preferred mode of Authentication").select(AuthType);
});

step("Enter Demographics/OTP details for Authentication Type <AuthType>", async function (AuthType) {
    if (AuthType === "MOBILE_OTP") {
        await waitFor('Enter OTP')
        await write("0000", into(textBox(above("Fetch ABDM Data"))));
    } else {
        await waitFor(textBox({ placeholder: "Name" }))
        await write(`${gauge.dataStore.scenarioStore.get("patientFirstName")} ${gauge.dataStore.scenarioStore.get("patientMiddleName")} ${gauge.dataStore.scenarioStore.get("patientLastName")}`, into(textBox({ placeholder: "Name" })));
        await dropDown(toRightOf('Choose Gender: ')).select(gauge.dataStore.scenarioStore.get("patientGender"))
        await write(`${gauge.dataStore.scenarioStore.get("dayOfBirth").toString().padStart(2, "0")}${gauge.dataStore.scenarioStore.get("monthOfBirth").toString().padStart(2, "0")}${gauge.dataStore.scenarioStore.get("yearOfBirth")}`, into(timeField(toRightOf("Enter Date of Birth: "))))
        await write(gauge.dataStore.scenarioStore.get("patientMobileNumber"), into(textBox(toRightOf("Enter Mobile Number: "))))
    }
});

step("Click on Fetch ABDM data", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = `${gauge.dataStore.scenarioStore.get("patientMiddleName")} ${gauge.dataStore.scenarioStore.get("patientLastName")}`
    var healthID = gauge.dataStore.scenarioStore.get("healthID");
    var yearOfBirth = gauge.dataStore.scenarioStore.get("yearOfBirth");
    var gender = users.getRandomPatientGender().charAt(0);
    const token = process.env.receptionist
    gauge.dataStore.scenarioStore.put("patientMobileNumber", "+919876543210");
    var patientMobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
    await ndhm.interceptAuthConfirmForNewPatient(token, healthID, firstName, lastName, yearOfBirth, gender, patientMobileNumber);
    await ndhm.interceptExistingPatientsWithParams(token, firstName, lastName, yearOfBirth, gender);
    await click(button("Fetch ABDM Data"));
});

step("Click on Authenticate to enter otp/demographic details", async function () {
	await ndhm.interceptAuthInit(process.env.receptionist);
    await click(button("Authenticate"));
});