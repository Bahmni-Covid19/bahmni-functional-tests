"use strict";
const path = require('path');
const {
    above,
	click,
	attach,
	fileField,
	waitFor,
} = require('taiko');

step("Open Patient Documents", async function() {
	await click("Patient Documents")
});

step("Add a lab report <labReport>", async function (labReport) {
	await attach(path.join("./data", labReport+'.jpg'), await fileField({'name':'image-document-upload'}));
});

step("Choose newly created patient", async function() {
	var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
	var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

	await click(firstName+" "+lastName,above(patientIdentifierValue))
});
