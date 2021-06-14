/* globals gauge*/
"use strict";

const {
    toRightOf,
    write,
    click,
    into,
    textBox,
    waitFor,
    press,
} = require('taiko');

step("Open newly created patient details by search", async function () {
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    console.log("patient Identifier"+patientIdentifierValue)
    await write(patientIdentifierValue, into(textBox({ "placeholder": "Enter ID" })))
    await press('Enter', {waitForNavigation:true});
});

step("waitFor <time>", async function (time) {
    await waitFor(time)
});

step("Click Start OPD Visit", async function () {
    await click("Start OPD Visit");
});
