"use strict";
const path = require('path');
const {
    above,
	click,
	attach,
	fileField,
	button,
	write,
} = require('taiko');

step("Open Patient Documents", async function() {
	await click("Patient Documents")
});

step("Add a lab report <labReport>", async function (labReport) {
	await attach(path.join("./data", labReport+'.jpg'), fileField({'name':'image-document-upload'}),{waitForEvents:['DOMContentLoaded']});
	await waitFor(1000)
	await click(button('SAVE'),{waitForNavigation:true})
});

step("Choose newly created patient", async function() {
	var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
	var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

	await write(patientIdentifierValue);
	await click(firstName+" "+lastName,above(patientIdentifierValue))
});

step("Click Save", async function () {
    await click("Save",{waitForNavigation:true});
});

