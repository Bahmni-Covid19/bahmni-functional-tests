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
var fileExtension = require("../util/fileExtension");

step("Doctor must be able to prescribe tests <prescriptions>", async function (prescriptionFile) {
    var prescriptionFile = "./data/"+prescriptionFile+".json";
    var testPrescriptions = JSON.parse(fileExtension.parseContent(prescriptionFile))
    gauge.message(testPrescriptions)

    await click("Orders",{force: true});
    for (var test of testPrescriptions.tests) {
            await click(test.test,{force: true})
    }     
    await click("Save",{force: true,waitForNavigation:true,navigationTimeout:180000})
});

step("Doctor starts prescribing medications <prescriptionNames>", async function (prescriptionNames) {
    await click("Medications",{waitForNavigation:true,navigationTimeout:180000});
    var prescriptionFile = "./data/"+prescriptionNames+".json";
    gauge.dataStore.scenarioStore.put("prescriptions",prescriptionFile)
    var medicalPrescriptions = JSON.parse(fileExtension.parseContent(prescriptionFile))
    gauge.message(medicalPrescriptions)

    if(medicalPrescriptions.drug_name!=null)
    {
        try
        {
            await write(medicalPrescriptions.drug_name,into(textBox(toRightOf("Drug Name"))));
            await dropDown(toRightOf("Units")).select(medicalPrescriptions.units);
            await dropDown(toRightOf("Frequency")).select(medicalPrescriptions.frequency)
            await click("Accept");
        
            await write(medicalPrescriptions.dose,into(textBox(toRightOf("Dose"))));
            await write(medicalPrescriptions.duration,into(textBox(toRightOf("Duration"))));    
        }
        catch(e){
            await write(medicalPrescriptions.drug_name,into(textBox(below("Drug Name"))));
            await dropDown(below("Units")).select(medicalPrescriptions.units);
            await dropDown(below("Frequency")).select(medicalPrescriptions.frequency)
            await click("Accept");
        
            await write(medicalPrescriptions.dose,into(textBox(below("Dose"))));
            await write(medicalPrescriptions.duration,into(textBox(below("Duration"))));    
        }
        await click("Add");
    }    
});


step("Doctor opens the clinical tab for newly created patient", async function () {
    await click("Clinical",{waitForNavigation:true,waitForEvents:['networkIdle'],navigationTimeout:180000});
});

step("Doctor captures consultation notes <notes>", async function(notes) {
    await click("Consultation",{force:true,waitForNavigation:true,waitForStart:2000});
    await waitFor(textBox({placeholder:"Enter Notes here"}))
    await write(notes,into(textBox({"placeholder" : "Enter Notes here"})),{force: true})
});

step("Doctor clicks consultation", async function() {
    await click("Consultation",{force:true, waitForNavigation:true,waitForStart:2000,navigationTimeout:180000});
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Choose Disposition", async function() {
    await click("Disposition",{waitForNavigation:true})  
    await waitFor(async () => !(await $("overlay").exists()))
});

step("Doctor advises admitting the patient", async function() {
    await dropDown("Disposition Type").select('Admit Patient')
    await write("Admission Notes",into(textBox(below("Disposition Notes"))))
});

step("Doctor advises discharging the patient", async function() {
    await dropDown("Disposition Type").select('Discharge Patient')
    await write("Discharge Notes",into(textBox(below("Disposition Notes"))))
});