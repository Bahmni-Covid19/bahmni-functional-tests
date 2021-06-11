/* globals gauge*/
"use strict";
const path = require('path');
var Buffer = require('buffer/').Buffer
const {
    openBrowser,
    $,
    dropDown,
    button,
    within,
    highlight,
    toRightOf,
    write,
    intercept,
    closeBrowser,
    goto,
    screenshot,
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
} = require('taiko');
var _fileExtension = require("./util/fileExtension");

const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({headless:headless,
        args: ["--start-fullscreen"]
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Open registration module", async function () {
    await goto(process.env.bahmniHome)

    await highlight("Clinical")
    await click("Registration", toLeftOf("Programs"));
});

step("To Associate a healthID, vefiy it", async function () {
    await click("Verify Health ID");
});

step("Enter random healthID details", async function () {
    await click(textBox(toRightOf("Enter Health ID")));
    var firstName = randomName(10)
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)

    var lastName = randomName(10)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)

    var patientHealthID = firstName+lastName+"@sbx";
    gauge.dataStore.scenarioStore.put("healthID",patientHealthID)

    await write(patientHealthID);
});

step("Fetch authentication modes", async function () {
    //https://mixedanalytics.com/knowledge-base/api-connector-encode-credentials-to-base-64/
    const token = process.env.receptionist

    await intercept(process.env.bahmniHost+ "/ndhm/null/v0.5/hip/fetch-modes", (request) => {
        var body1 = {
            "authModes": [
                "MOBILE_OTP",
                "AADHAAR_OTP"
            ]
        };
        var reqBodyOnFetchModes = JSON.stringify(body1);
        request.respond({
            method: 'POST',
            port: '9052',
            hostname: process.env.bahmniHost,
            path: '/v0.5/users/auth/on-fetch-modes',
            body: body1,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'content-length': reqBodyOnFetchModes.length,
                'X-HIP-ID': '10000005'
            }
        })
    })

    await click(text("Verify", within($(".verify-health-id"))));
});

step("Select Mobile OTP", async function () {
    await dropDown("Preferred mode of Authentication").select("MOBILE_OTP");
});

step("Authenticate with Mobile", async function () {
    const token = process.env.receptionist
    var reqBodyOnFetchModes = JSON.stringify("");

    await intercept(process.env.bahmniHost+ "/ndhm/null/v0.5/hip/auth/init", (request) => {
        request.respond({
            method: 'POST',
            port: '9052',
            hostname: process.env.bahmniHost,
            path: '/v0.5/users/auth/on-init',
            body: {},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'content-length': reqBodyOnFetchModes.length,
                'X-HIP-ID': '10000005'
            }
        })
    })
    await click(button("Authenticate"))
});

step("Login as a receptionist with admin credentials location <location>", async function (location) {
    var userName = getUserName(process.env.receptionist);
    var password = getPassword(process.env.receptionist);
    
    await write(userName, into(textBox(toRightOf("Username *"))));
    await write(password, into(textBox(toRightOf("Password *"))));
    await dropDown("Location").select(location);
    await click(button("Login"));
});

function getUserName(encodedUser){
    let user = new Buffer(encodedUser,'base64');
    let decodedUser = user.toString('ascii');
    return decodedUser.split(":")[0]
}

function getPassword(encodedUser){
    let user = new Buffer(encodedUser,'base64');
    let decodedUser = user.toString('ascii');
    return decodedUser.split(":")[1]
}

step("Goto Bahmni home", async function () {
    await goto(process.env.bahmniHome);
});

step("Create a new patient with verfication id", async function () {
    await click("Create New");
});

step("Enter patient random first name", async function () {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    if(firstName==null||firstName=="")
    {
        firstName = randomName(10)
        gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    }
    await write(firstName, into(textBox(toRightOf("Patient Name*"))));
});

step("Enter patient random middle name", async function () {
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName")
    if(middleName==null||firstName=="")
    {
        middleName = randomName(10)
        gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
    }
    await write(middleName, into(textBox({ "placeholder": "Middle Name" })));
    gauge.dataStore.scenarioStore.put("patientMiddleName",middleName)
});

step("Enter patient random last name", async function () {
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")
    if(lastName==null||firstName=="")
    {
        lastName = randomName(10)
        gauge.dataStore.scenarioStore.put("patientLastName",lastName)
    }

    await write(lastName, into(textBox({ "placeholder": "Last Name" })));
});

function randomName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

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

step("Save the patient data", async function () {
    await click("Save");
    await waitFor(5000)
    var patientIdentifier = await $('#patientIdentifierValue').text();
    gauge.dataStore.scenarioStore.put("patientIdentifier", patientIdentifier);
});

step("Click Start OPD Visit", async function () {
    await click("Start OPD Visit");
});

step("Enter registration fees <arg0>", async function (arg0) {
    await write("100", into(textBox(toRightOf("Registration Fees"))));
});

step("Click Save", async function () {
    await click("Save");
});

step("Go back to home page", async function () {
    await goto(process.env.bahmniHost+ "/bahmni/home/index.html#/dashboard")
    //await click($('.back-btn'));
});

step("Click create new patient", async function () {
    await click("Create New")
});

step("Open newly created patient details by search", async function () {
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    await write(patientIdentifierValue, into(textBox({ "placeholder": "Enter ID" })))
    await click("Search", toRightOf(patientIdentifierValue));
});

step("Verify if healthId entered already exists", async function () {
    const token = process.env.receptionist

    var healthID =gauge.dataStore.scenarioStore.get("healthID")

    await intercept(process.env.bahmniHost+ "/ndhm/null/existingPatients/" + healthID, (request) => {
        var body1 = {
            "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
        };
        var reqBodyOnFetchModes = JSON.stringify(body1);
        request.respond({
            method: 'POST',
            port: '9052',
            body: body1,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'content-length': reqBodyOnFetchModes.length
            }
        })
    })

});

step("waitFor <time>", async function (time) {
    await waitFor(time)
});

step("Enter OTP for health care validation <otp> for with new healthID, patient details and mobileNumber <patientMobileNumber>",
    async function (otp, patientMobileNumber) {
        var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
        var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

        var healthID = gauge.dataStore.scenarioStore.get("healthID",healthID)

        await write(otp, into(textBox(above("Confirm"))));
        const token = process.env.receptionist
        var yearOfBirth = "2000";
        var gender = "F"
    
        var confirm = _fileExtension.parseContent("./data/confirm/simple.txt")
            .replace('<healthID>', healthID)
            .replace('<fullName>', firstName +" " + lastName)
            .replace('<gender>', gender)
            .replace('<yearOfBirth>', yearOfBirth)
            .replace('<district>', "NORTH AND MIDDLE ANDAMAN")
            .replace('<state>', "ANDAMAN AND NICOBAR ISLANDS")
            .replace('<mobileNumber>', patientMobileNumber)
            .replace('<healthNumber>', "00-0000-0000-0000");
        await intercept(process.env.bahmniHost+ "/ndhm/null/v0.5/hip/auth/confirm", (request) => {
            request.respond({
                method: 'POST',
                port: '9052',
                hostname: process.env.bahmniHost,
                path: '/v0.5/users/auth/on-init',
                body: confirm,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'content-length': confirm.length,
                    'X-HIP-ID': '10000005'
                }
            })
        });
        var existingPatientUrl = process.env.bahmniHost+ "/ndhm/null/existingPatients?patientName=" + 
            firstName + "+" + lastName
            + "&patientYearOfBirth=" + yearOfBirth + "&patientGender=" + gender;
        await intercept(existingPatientUrl, (request) => {
            var body1 = {
                "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
            };
            var reqBodyOnFetchModes = JSON.stringify(body1);
            request.respond({
                method: 'GET',
                port: '9052',
                body: body1,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'content-length': reqBodyOnFetchModes.length
                }
            })
        })
        await click(button("Confirm"))
        await click(button("Create New Record"))

        await click(button("Update"),{force: true})
    });

step("Enter visit details", async function() {
	await click(button("Enter Visit Details"))
});

step("Close visit", async function() {
    await confirm('Are you sure you want to close this visit?', async () => await accept())
	await click(button("Close Visit"))
});

step("Log out", async function () {
    try
    {
        await click(button({"class":"btn-user-info fr"}))
        await click('Logout')    
    }catch(e){}
});

step("Enter village <village>", async function(village) {
	await write(village, into(textBox(toRightOf("Village"))))
});

step("Click on home page and goto registration module", async function () {
    await click($(".back-btn"))
    await click('Registration')
});