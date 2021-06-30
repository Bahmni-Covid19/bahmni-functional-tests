"use strict";
const {
    goto,
    write,
    click,
    into,
    below,
    waitFor,
	press,
	checkBox,
	textBox,
	toLeftOf,
	$,
	confirm,
	accept,
	button,
} = require('taiko');


step("Add this newly created patient as merge patient1", async function() {
    gauge.dataStore.scenarioStore.put("merge_patientIdentifier1", gauge.dataStore.scenarioStore.get('patientIdentifier'));
});

step("Add this newly created patient as merge patient2", async function() {
	gauge.dataStore.scenarioStore.put("merge_patientIdentifier2", gauge.dataStore.scenarioStore.get('patientIdentifier'));
});

step("Goto the openMRS Admin tab", async function() {
	await goto(process.env.bahmniHost+process.env.admin);
});

step("Find patients to merge", async function() {
	await click("Find Patients to Merge")
});

step("Enter patient identifiers to be merged", async function() {
	var patientsToBeMerged = gauge.dataStore.scenarioStore.get("merge_patientIdentifier1")+","+gauge.dataStore.scenarioStore.get("merge_patientIdentifier2")
	await write(patientsToBeMerged,into(textBox(below("Identifier"))))
	await click("Search",below(patientsToBeMerged))
});

step("Select the patients to be merged", async function() {
	await click(checkBox(toLeftOf(gauge.dataStore.scenarioStore.get("merge_patientIdentifier1"))))
	await click(checkBox(toLeftOf(gauge.dataStore.scenarioStore.get("merge_patientIdentifier2"))))
	await click('Continue')
});

step("Merge patients", async function() {
	await waitFor(async () => !(await $("Loading...").exists()))
	await confirm('Are you sure you want to merge these patients?', async () => await accept())	
	await click(button("Merge Patients"))
//	await waitFor(async () => (await $("Patients merged successfully").exists()))
});

step("add patients to be merged <patient1> and <patient2>", async function(patient1, patient2) {
	gauge.dataStore.scenarioStore.put("merge_patientIdentifier1",patient1);
	gauge.dataStore.scenarioStore.put("merge_patientIdentifier2",patient2)
});