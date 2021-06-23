"use strict";
const {
    goto,
    write,
    click,
    into,
    below,
    waitFor,
	press,
	checkBox
} = require('taiko');


step("Add this newly created patient as merge patient1", async function() {
    gauge.dataStore.scenarioStore.put("merge_patientIdentifier1", gauge.dataStore.scenarioStore.get('patientIdentifier'));
});

step("Add this newly created patient as merge patient2", async function() {
	gauge.dataStore.scenarioStore.put("merge_patientIdentifier2", gauge.dataStore.scenarioStore.get('patientIdentifier'));
});

step("Goto the openMRS Admin tab", async function() {
	await goto(process.env.bahmniHome+process.env.admin);
});

step("Find patients to merge", async function() {
	await click("Find Patients to Merge")
});

step("Enter patient identifiers to be merged", async function() {
	var patientsToBeMerged = gauge.dataStore.scenarioStore.get("merge_patientIdentifier1")+","+gauge.dataStore.scenarioStore.get("merge_patientIdentifier2")
	await write(patientsToBeMerged)
	await click("Search",below(patientsToBeMerged))
});

step("Select the patients to be merged", async function() {
	await click(checkBox(toLeftOf(gauge.dataStore.scenarioStore.get("merge_patientIdentifier1"))))
	await click(checkBox(toLeftOf(gauge.dataStore.scenarioStore.get("merge_patientIdentifier2"))))
	await click('Continue')
});

step("Merge patients", async function() {
	await waitFor(async () => !(await $("Loading...").exists()))
	await click(button("Merge Patients"))
	await confirm('Are you sure you want to merge these patients?', async () => await accept())	
	await waitFor(async () => (await $("Patients merged successfully").exists()))
});