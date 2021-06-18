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
	$
} = require('taiko');
const _openmrs = require("./util/omod")
step("Open In Patient module", async function() {
	await click("InPatient",{waitForNavigation:true,waitForEvents:['networkIdle'],navigationTimeout:180000})
});

step("Nurse opens admission tab", async function() {
	await click("To Admit",{waitForNavigation:true})
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
	await waitFor(1000)
});

step("Admit the patient", async function() {
	await _openmrs.interceptAdmissionLocation()
	await click("Admit",{waitForNavigation:true})
});

step("Discharge the patient", async function() {
	await dropDown('Patient Movement').select('Discharge Patient')
	await click("Discharge",{waitForNavigation:true})
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