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
	$,
} = require('taiko');
const openmrs = require("./util/omod")
var taikoHelper = require("./util/taikoHelper");
var fileExtension = require("./util/fileExtension");

step("Nurse opens admission tab", async function() {
	await taikoHelper.repeatUntilNotFound($("#overlay"))
	await click("To Admit",{waitForNavigation:true,navigationTimeout:180000})
});

step("Enter adt notes <notes>", async function (notes) {
	await write(notes,into(textBox(below("Adt Notes"))))
});

step("Select bed for admission", async function() {
	await openmrs.interceptGeneralWard()
	await click("General Ward")
});

step("Allocate bed <bedNumber>", async function(bedNumber) {
	await click(bedNumber)
});

step("Click Assign", async function() {
	await click("Assign",{waitForNavigation:true,navigationTimeout:180000})
	await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Admit the patient", async function() {
	await openmrs.interceptAdmissionLocation()
	await click("Admit",{waitForNavigation:true})
});

step("Discharge the patient", async function() {
	await dropDown('Patient Movement').select('Discharge Patient')
	await click("Discharge",{waitForNavigation:true,navigationTimeout:180000})
});

step("Select Patient Movement <movement>", async function(movement) {
	await waitFor(2000)
	await dropDown('Patient Movement').select(movement)
});

step("Goto All admissions", async function() {
	await waitFor("All")
    await click("All",{force:true})
});

step("Goto Admitted tab", async function() {
	await click("Admitted")
});

step("Goto back from clinical tab", async function () {
	await click($("#clinicalHomeBackLink"),{waitForNavigation:true,waitForEvents:['networkIdle'],navigationTimeout:250000});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("View Admitted patients", async function() {
	await click("Admitted")
});

step("Enter admitted patient details", async function() {
	var patientIdentifierValue= gauge.dataStore.scenarioStore.get("patientIdentifier");
	await write(patientIdentifierValue, into(textBox(below("Admitted"))))
	await press("Enter",{waitForNavigation:true})
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Click Discharge", async function() {
	await click("Discharge")
});

step("Click Discharge on popup", async function() {
	await waitFor(async () => !(await $("overlay").exists()));
	await click(text('Discharge', within($('[ng-click="dischargeConfirmation()"]'))));
});

step("Select Second Vitals", async function () {
	await waitFor('Second Vitals')
	await click("Second Vitals",{waitForNavigation:true})
});

step("Add new observation form", async function() {
	await click("Add New Obs Form",{waitForNavigation:true,navigationTimeout:180000});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Enter Observation Form <observationFormFile>", async function(observationFormFile) {
    await click("Add New Obs Form",{waitForNavigation:true,navigationTimeout:180000});
    await taikoHelper.repeatUntilNotFound($("#overlay"))

    var observationFormValues = JSON.parse(fileExtension.parseContent("./data/opConsultation/"+observationFormFile+".json"))

    await click(button(observationFormValues.ObservationFormName,{waitForNavigation:true,navigationTimeout:180000}));
    await taikoHelper.repeatUntilNotFound($("#overlay"))
    await taikoHelper.executeConfigurations(observationFormValues.ObservationFormDetails,observationFormValues.ObservationFormName)

    await click("Save",{waitForNavigation:true,navigationTimeout:180000});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
})
