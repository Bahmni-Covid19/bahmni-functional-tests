"use strict";
const path = require('path');
const {
    write,
    click,
    into,
    textBox,
    above,
} = require('taiko');

step("Doctor opens the consultation tab for patient <firstName> <lastName>", async function (firstName, lastName) {
    await click("Clinical");
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    await click(firstName+" "+lastName,above(patientIdentifierValue));
    try{
        await click("OK");
    }
    catch(e){}
    await click("Consultation");
    try{
        await click("OK");
    }
    catch(e){}
});

step("Doctor captures consultation notes <notes>", async function(notes) {
	await click("Consultation");
	await write(notes,into(textBox({"placeholder" : "Enter Notes here"})));
});