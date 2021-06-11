"use strict";
const path = require('path');
const {
    click,
    above,
    within,
    $,
    waitFor,
} = require('taiko');

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