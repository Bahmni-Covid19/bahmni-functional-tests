/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    setConfig,
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
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    waitFor
} = require('taiko');

const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
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

step("Open registration module", async function() {
        await highlight("Clinical")
        await click("Registration",toLeftOf("Programs"));
    });
    
    step("To Associate a healthID, vefiy it", async function() {
        await click("Verify Health ID");
    });
    
    step("Enter healthID <patientHealthID> details", async function (patientHealthID) {
        await click(textBox(toRightOf("Enter Health ID")));
        await write(patientHealthID);
    });
    
    step("Fetch authentication modes", async function() {
        //https://mixedanalytics.com/knowledge-base/api-connector-encode-credentials-to-base-64/
        const token = process.env.receptionist         
      
        await intercept("https://ndhm-dev.bahmni-covid19.in/ndhm/null/v0.5/hip/fetch-modes", (request) => {
        var body1 ={
            "authModes": [
                "MOBILE_OTP",
                "AADHAAR_OTP"
            ]
        };
        var reqBodyOnFetchModes = JSON.stringify(body1);
        request.respond({
            method: 'POST',
            port: '9052',
            hostname: 'https://ndhm-dev.bahmni-covid19.in/',
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
                
        await click(text("Verify",within($(".verify-health-id"))));

        await waitFor(10000)
});

step("Select Mobile OTP", async function() {
    await dropDown("Preferred mode of Authentication").select("MOBILE_OTP");
    await click(button("Authenticate"))
});

step("Authenticate with Mobile", async function() {
    const token = process.env.receptionist         
      
        await intercept("https://ndhm-dev.bahmni-covid19.in/hiprovider/v0.5/hip/auth/init", (request) => {
        request.respond({
        })
    })

});

step("Enter OTP for health care validation <arg0>", async function(arg0) {
    await write("0000",into(textBox(toRightOf("Enter OTP"))));
    await click(button("Confirm"))

    await intercept("https://ndhm-dev.bahmni-covid19.in/hiprovider/v0.5/hip/auth/confirm",(request)=>{
            request.respond({"error":{"code":1405,"message":"Invalid OTP"}})

    //https://ndhm-dev.bahmni-covid19.in/hiprovider/v0.5/hip/auth/confirm
    })
});

step("Login as a receptionist with username <userName> password <password> location <location>", async function(userName, password, location) {
        await write(userName,into(textBox(toRightOf("Username *"))));
        await write(password,into(textBox(toRightOf("Password *"))));
        await dropDown("Location").select(location);
        await click(button("Login"));
});

step("Goto Bahmni home", async function() {
        await goto(process.env.bahmniHome);
});

step("Create a new patient with verfication id", async function() {
    await click("Create New");
});

step("Enter patient first name <firstName>", async function(firstName) {
    await write(firstName,into(textBox(toRightOf("Patient Name*"))));
});

step("Enter patient middle name <middleName>", async function(middleName) {
    await write(middleName,into(textBox({"placeholder" : "Middle Name"})));
});

step("Enter patient last name <lastName>", async function(lastName) {
    await write(lastName,into(textBox({"placeholder" : "Last Name"})));
});

step("Enter patient gender <gender>", async function(gender) {
	await dropDown("Gender *").select(gender);
});

step("Enter age of the patient <age>", async function(age) {
    await write(age, into(textBox(toRightOf("Years"))));
    await click(checkBox(toLeftOf("Estimated")));
});

step("Enter patient mobile number <mobile>", async function(mobile) {
    await write(mobile, into(textBox(toRightOf("Primary Contact"))));
});

step("Save the patient data", async function() {
    await click("Save");
});

step("Click Start OPD Visit", async function() {
    await click(button("Start OPD visit"));
});

step("Enter registration fees <arg0>", async function(arg0) {
    await write("100", into(textBox(toRightOf("Registration Fees"))));
});

step("Click Save", async function() {
    await click("Save");
});

step("Go back to home page", async function() {
    await click($('.back-btn'));
});

step("Click create new patient", async function() {
	await click("Create New")
});