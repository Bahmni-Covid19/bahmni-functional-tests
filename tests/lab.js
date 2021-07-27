"use strict";
const path = require('path');
const {
    above,
	click,
	attach,
	fileField,
	button,
	write,
	waitFor,
	$,
	text
} = require('taiko');
const taikoHelper = require("./util/taikoHelper")

step("Add a report <labReport> to <module>", async function (labReport, module) {
	await attach(path.join("./data", labReport+'.jpg'), fileField({'name':'image-document-upload'}),{waitForEvents:['DOMContentLoaded']});
	await taikoHelper.repeatUntilNotFound($("#overlay"))
	await click(button('SAVE'),{waitForNavigation:true})
	await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Choose newly created patient", async function() {
	var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
	var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

	await write(patientIdentifierValue);
	await click(firstName+" "+lastName,above(patientIdentifierValue))
});

step("Save consultation data", async function () {
	await click("Save",{waitForNavigation:true,navigationTimeout:180000});
	await taikoHelper.repeatUntilNotFound($("#overlay"))
    await taikoHelper.repeatUntilNotFound(text("Saved"))
});

step("Save visit data", async function () {
	await click("Save",{waitForNavigation:true,waitForStart:2000,navigationTimeout:180000});
	await taikoHelper.repeatUntilNotFound($("#overlay"))
	await taikoHelper.repeatUntilNotFound(text("Saved"))
});
