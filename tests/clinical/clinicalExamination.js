"use strict";
const {
    click,
    waitFor,
    toRightOf, 
    textBox, 
    into, 
    write, 
    dropDown,
    highlight,
    below,
    $,
    text
} = require('taiko');
var _fileExtension = require("../util/fileExtension");

step("Doctor must be able to prescribe tests <prescriptions>", async function (prescriptionFile) {
    var prescriptionFile = "./data/"+prescriptionFile+".json";

    var prescriptions = JSON.parse(_fileExtension.parseContent(prescriptionFile))
    await click("Orders",{force: true});
    for (var test of prescriptions.tests) {
            await click(test.test,{force: true})
    }     
    await click("Save",{force: true})
});

step("Doctor starts prescribing medications <prescriptionNames>", async function (prescriptionNames) {
    await click("Medications");
    var prescriptionFile = "./data/"+prescriptionNames+".json";
    gauge.dataStore.scenarioStore.put("prescriptions",prescriptionFile)
    var prescriptions = JSON.parse(_fileExtension.parseContent(prescriptionFile))

    if(prescriptions.drug_name!=null)
    {
        await write(prescriptions.drug_name,into(textBox(toRightOf("Drug Name"))));
        await dropDown(toRightOf("Units")).select(prescriptions.units);
        await dropDown(toRightOf("Frequency")).select(prescriptions.frequency)
        await click("Accept");
    
        await write(prescriptions.dose,into(textBox(toRightOf("Dose"))));
        await write(prescriptions.duration,into(textBox(toRightOf("Duration"))));
        await click("Add");
    }
    await click("Save")
});


step("Doctor opens the clinical tab for newly created patient", async function () {
    await click("Clinical",{waitForNavigation:true,waitForEvents:['networkIdle'],navigationTimeout:20000});
});

step("Doctor captures consultation notes <notes>", async function(notes) {
    await click("Consultation",{force:true,waitForNavigation:true,waitForStart:2000});
    await waitFor(textBox({placeholder:"Enter Notes here"}))
    await write(notes,into(textBox({"placeholder" : "Enter Notes here"})),{force: true})
});

step("Doctor clicks consultation", async function() {
    await click("Consultation",{force:true, waitForNavigation:true,waitForStart:2000});
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Choose Disposition", async function() {
    await click("Disposition",{waitForNavigation:true})    
});

step("Doctor advises admitting the patient", async function() {
    await dropDown("Disposition Type").select('Admit Patient')
    await write("Admission Notes",into(textBox(below("Disposition Notes"))))
    await click("Save");
    await waitFor(async () => !(await $("Saved").exists()))
});

step("Doctor advises discharging the patient", async function() {
    await dropDown("Disposition Type").select('Discharge Patient')
    await write("Discharge Notes",into(textBox(below("Disposition Notes"))))
    await click("Save");
    await waitFor(async () => !(await $("Saved").exists()))
});