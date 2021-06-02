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

step("Add a lab report", async function() {
	await attach(path.join("./data", 'labReport1.jpg'), await fileField({'name':'image-document-upload'}));
	await waitFor(10000)
});

step("Choose patient <patientFirstName> <patientLastName>", async function(patientFirstName, patientLastName) {
	var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
	await click(patientFirstName+" "+patientLastName,above(patientIdentifierValue))
});
