"use strict"
const { goto, toRightOf, textBox, into, write, click, $,below, checkBox,waitFor,image,within } = require('taiko');
var _fileExtension = require('./util/fileExtension')
step("Enter password in ELIS", async function() {
    await write("adminADMIN!",into(textBox(toRightOf("Enter Password:"))));
});

step("goto ELIS home", async function() {
        await goto(process.env.bahmniHost + process.env.openelisHome);
});

step("enter user name in ELIS", async function() {
        await write("admin",into(textBox(toRightOf("Enter Username:"))));
});

step("click Submit", async function() {
        await click("Submit");	
});

step("Find the patient", async function () {
        var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
        await write(patientIdentifierValue,into(textBox(below("Patient Id"))));
});

step("Click collect sample", async function () {
        await click("Collect Sample");
});

step("Generate the auto id", async function() {
        await waitFor(2000)
        await click("Generate");
});

step("Save in openELIS", async function () {
        await click("Save");
});


step("Enter lab result <details> in the result", async function (details) {
        var content = _fileExtension.parseContent("./data/elis/samplesCollected/"+details+".json")
        var bloodResultsContent = null;
        bloodResultsContent = JSON.parse(content)
        for(var bloodResultIndx=0;bloodResultIndx<bloodResultsContent.bloodResults.length;bloodResultIndx++){
                await write(bloodResultsContent.bloodResults[bloodResultIndx].value,into(textBox(toRightOf(bloodResultsContent.bloodResults[bloodResultIndx].name)))) 
        }        
});

step("Click today's sample in samples collected", async function () {
        await click("Today",below("Samples Collected"));
});

step("Click collect sample for <patientIdentifier>", async function(patientIdentifier) {
        await click("Backlog",below("Samples to Collect"));
        await write(patientIdentifier,into(textBox(below("Patient ID"))));
        await click("Collect Sample");
});

step("Validate lab result details in samples collected", async function() {
        var patientIdentifier = gauge.dataStore.scenarioStore.get("patientIdentifier")
        await click(image({title:'Validate'}),toRightOf(patientIdentifier))
        var content = _fileExtension.parseContent("./data/elis/samplesCollected/blood.json")
        var bloodResultsContent = null;
        bloodResultsContent = JSON.parse(content)
        for(var bloodResultIndx=0;bloodResultIndx<bloodResultsContent.bloodResults.length;bloodResultIndx++){
                await click(checkBox(within($("#row_"+bloodResultIndx),below("Accept"))));
        }
        await click("Save")
});

step("Put identifier <patientIdentifier>", async function(patientIdentifier) {
        gauge.dataStore.scenarioStore.put("patientIdentifier",patientIdentifier);
});

step("Click backlog of sample collection", async function() {
        await click("Backlog",below("Samples to Collect"));
});

step("Open the result of the patient", async function() {
        var patientIdentifier = gauge.dataStore.scenarioStore.get("patientIdentifier")
        await click(image({title:'Result'}),toRightOf(patientIdentifier))
});