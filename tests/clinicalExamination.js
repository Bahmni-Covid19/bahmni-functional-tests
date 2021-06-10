"use strict";
const path = require('path');
const {
    write,
    click,
    into,
    textBox,
    above,
    within,
    accept,
    confirm,
    $,
    waitFor,
} = require('taiko');

step("Doctor opens the consultation tab for newly created patient", async function () {
    await click("Clinical");
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    await click(firstName+" "+lastName,above(patientIdentifierValue));
    await waitFor(3000)
    await click("Consultation",within($(".opd-header-bottom")));
});

step("Doctor captures consultation notes <notes>", async function(notes) {
    await confirm("Cannot read property 'length' of undefined", async () => await accept())

	await click("Consultation",{force: true});
	await write(notes,into(textBox({"placeholder" : "Enter Notes here"})),{force: true});
});