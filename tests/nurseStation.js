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
const _openmrs = require("./util/omod")
var taikoHelper = require("./util/taikoHelper");
var fileExtension = require("./util/fileExtension");

step("Nurse opens admission tab", async function() {
	await waitFor(async () => !(await $("overlay").exists()))
	await click("To Admit",{waitForNavigation:true,navigationTimeout:180000})
});

step("Enter adt notes <notes>", async function (notes) {
	await write(notes,into(textBox(below("Adt Notes"))))
});

step("Select bed for admission", async function() {
	await _openmrs.interceptGeneralWard()
	await click("General Ward")
});

step("Allocate bed <bedNumber>", async function(bedNumber) {
	await click(bedNumber)
});

step("Click Assign", async function() {
	await click("Assign")
	await waitFor(async () => !(await $("overlay").exists()))
});

step("Admit the patient", async function() {
	await _openmrs.interceptAdmissionLocation()
	await click("Admit",{waitForNavigation:true})
});

step("Discharge the patient", async function() {
	await dropDown('Patient Movement').select('Discharge Patient')
	await click("Discharge",{waitForNavigation:true,navigationTimeout:180000})
});

step("Select Patient Movement <movement>", async function(movement) {
	await dropDown('Patient Movement').select(movement)
});

step("Goto All admissions", async function() {
	await waitFor("All")
    await click("All",{force:true})
});

step("Goto Admitted tab", async function() {
	await click("Admitted")
});

step("Goto clinical tab", async function() {
	await click($("#clinicalHomeBackLink"),{waitForNavigation:true,waitForEvents:['networkIdle']});
});

step("View Admitted patients", async function() {
	await click("Admitted")
});

step("Enter admitted patient details", async function() {
	var patientIdentifierValue= gauge.dataStore.scenarioStore.get("patientIdentifier");
	await write(patientIdentifierValue, into(textBox(below("Admitted"))))
	await press("Enter",{waitForNavigation:true})
    await waitFor(async () => !(await $("overlay").exists()))
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
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Nurse adds observation form <observationForm>", async function (observationForm) {
	await click(button(observationForm));
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Smoking history", async function() {
    await click(button("Yes",toRightOf("Smoking history")));
	await write("2",into(textBox(toRightOf("Packs per day"))));
	await write("2",into(textBox(toRightOf("Number of years"))));
});

step("Alcohol abuse", async function() {
    await click(button("Yes",toRightOf("Alcohol abuse")));
    await write("Details of Alcohol abuse",into(textBox(below("Alcohol abuse"))));
});


step("Nurse enters HIV Testing and Counseling details", async function() {
	await click(button("Yes",toRightOf("Pre-test Counseling")));
	await click(button("Yes",toRightOf("HIV Tested Before")));
	await click(button("Positive",toRightOf("If tested, Result")));
	await click(button("STI",toRightOf("Medical Reason for Test")));
	await write("Others(Specify)",into(textBox(toRightOf("Others (Specify)"))));
	await click(button("No",toRightOf("Pregnancy Status")));
	await click(button("Others",toRightOf("Risk Group")));
	await click(button("Yes",toRightOf("Informed Consent")));
	await click(button("Positive",toRightOf("Initial")));
	await click(button("Negative",toRightOf("Confirmatory")));
	await click(button("Not Applicable",toRightOf("Tie Breaker")));
	await click(button("No",toRightOf("Post-test Counseling")));
	await click(button("No",toRightOf("Result Recieved")));
	await click(button("Negative",toRightOf("Test Result")));
	await click(button("No",toRightOf("Partner Counseling")));
	await click(button("II",toRightOf("WHO Staging")));
	await click(button("In",toRightOf("Referred")));
});

step("Nurse enters HIV Treatment and Care - Intake details", async function() {
	throw 'Unimplemented Step';
});

step("Nurse enters HIV Treatment and Care - Progress details", async function() {
	throw 'Unimplemented Step';
});

step("Enter Observation Form <observationFormFile>", async function(observationFormFile) {
    await click("Add New Obs Form",{waitForNavigation:true,navigationTimeout:180000});
    await waitFor(async () => !(await $("overlay").exists()))

    var observationFormValues = JSON.parse(fileExtension.parseContent("./data/opConsultation/"+observationFormFile+".json"))

    await click(button(observationFormValues.ObservationFormName,{waitForNavigation:true,navigationTimeout:180000}));
    await waitFor(async () => !(await $("overlay").exists()))
    await taikoHelper.executeConfigurations(observationFormValues.ObservationFormDetails,observationFormValues.ObservationFormName)

    await click("Save",{waitForNavigation:true,navigationTimeout:180000});
    await waitFor(async () => !(await $("overlay").exists()))
})
