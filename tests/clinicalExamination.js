"use strict";
const {
    click,
    above,
    within,
    $,
    waitFor,
    toRightOf, 
    textBox, 
    into, 
    write, 
    dropDown
} = require('taiko');

step("Doctor must be able to prescribe tests <tests>", async function(tests) {
        await click("Orders",{force: true});
        for (var test of tests.rows) {
                await click(test.cells[0],{force: true})
        }     
        await click("Save",{force: true})   
});

step("Doctor starts prescribing medications", async function () {
    await click("Medications");
});

step("Doctor prescribes drug <drugName> at a frequency <frequency>", async function(drugName,frequency) {
        await write(drugName,into(textBox(toRightOf("Drug Name"))));
	    await dropDown({id: 'frequency'}).select(frequency)
        await click("Accept");
});

step("Doctor prescribes drug dosage <dosage> for a duration <duration>.", async function (dosage, duration) {
        await write(dosage,into(textBox(toRightOf("Dose"))));
        await write(duration,into(textBox(toRightOf("Duration"))));
        await click("Add");
});
step("Doctor opens the consultation tab for newly created patient", async function () {
    await click("Clinical");
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    await click(firstName+" "+lastName,above(patientIdentifierValue));
    await waitFor(3000)
    await click("Consultation",within($(".opd-header-bottom")));
});

step("Doctor captures consultation notes <notes>", async function(notes) {
    await waitFor(5000)
    //Consultation notes having an issue
});

// async function doUntilNoError(asyncFunction,count){
//     var hasNoError = false
//     var localcount =0
//     do{
//         try{
//             await asyncFunction;
//             hasNoError = true
//         }catch(e)
//         {
//             if(localcount>=count)
//                 break;
//             localcount++
//             await waitFor(3000)
//         }
//     }while(!hasNoError)
// }