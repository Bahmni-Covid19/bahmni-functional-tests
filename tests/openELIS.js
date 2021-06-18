"use strict"
const { goto, toRightOf, textBox, into, write, click, below, $ } = require('taiko');
step("Enter password in ELIS", async function() {
    await write("adminADMIN!",into(textBox(toRightOf("Enter Password:"))));
});

step("goto ELIS home", async function() {
        await goto(process.env.openelisHome);
});

step("enter user name in ELIS", async function() {
        await write("admin",into(textBox(toRightOf("Enter Username:"))));
});

step("click Submit", async function() {
        await click("Submit");	
});

step("Find the patient to collect sample", async function() {
        var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
        await write(patientIdentifierValue,into(textBox(below("Patient Id"))));
});

step("Click collect sample", async function() {
        await click("Collect Sample");
});

step("Generate the auto id", async function() {
        await click("Generate");
});

step("Save the sample details", async function() {
        await click("Save");
});


step("Enter lab result details in samples collected", async function () {
        await click($("#result"));
});

step("Click today's sample in samples collected", async function () {
        await click("Today",below("Samples Collected"));
});