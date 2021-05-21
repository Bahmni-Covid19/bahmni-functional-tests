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

step("Login to Bahmni as a receptionist", async function() {
        await goto(process.env.bahmniHome);
        await write("superman",into(textBox(toRightOf("Username *"))));
        await write("Admin1234",into(textBox(toRightOf("Password *"))));
        await dropDown("Location").select("General Ward");
        await click(button("Login"));
});

step("Open registration module", async function() {
        await highlight("Clinical")
        await click("Registration",toLeftOf("Programs"));
    });
    
    step("Create a new patient", async function() {
        await click("Create New");
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