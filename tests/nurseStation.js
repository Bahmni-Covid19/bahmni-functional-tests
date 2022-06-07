"use strict";
const path = require('path');
const {
    above,
	click,
	attach,
	fileField,
	button,
	write,
	dropDown,
	into,
	textBox,
	below,
	waitFor,
	within,
	confirm,
	accept,
	text,
	press,
	highlight,
	timeField,
	toRightOf,
	$
} = require('taiko');
const openmrs = require("./util/omod")
var taikoHelper = require("../bahmni-e2e-common-flows/tests/util/taikoHelper");
var fileExtension = require("../bahmni-e2e-common-flows/tests/util/fileExtension");

step("Allocate bed <bedNumber>", async function(bedNumber) {
	await click(bedNumber)
});

step("Goto All admissions", async function() {
	await waitFor("All")
    await click("All",{force:true})
});

step("Enter Observation Form <observationFormFile>", async function(observationFormFile) {
    await click("Add New Obs Form",{waitForNavigation:true,navigationTimeout:process.env.actionTimeout});
    await taikoHelper.repeatUntilNotFound($("#overlay"))

    var observationFormValues = JSON.parse(fileExtension.parseContent("./bahmni-e2e-common-flows/data/opConsultation/"+observationFormFile+".json"))

    await click(button(observationFormValues.ObservationFormName,{waitForNavigation:true,navigationTimeout:process.env.actionTimeout}));
    await taikoHelper.repeatUntilNotFound($("#overlay"))
    await taikoHelper.executeConfigurations(observationFormValues.ObservationFormDetails,observationFormValues.ObservationFormName)

    await click("Save",{waitForNavigation:true,navigationTimeout:process.env.actionTimeout});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
})
