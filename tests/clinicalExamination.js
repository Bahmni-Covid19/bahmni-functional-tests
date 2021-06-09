"use strict";
const path = require('path');
const {
    write,
    click,
    into,
    textBox,
    above,
} = require('taiko');

step("Doctor opens the consultation tab for newly created patient", async function () {
    await click("Clinical");
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

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