"use strict";
const path = require('path');
const {
    write,
    click,
    into,
    textBox,
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

    await click("Consultation",{force: true});

    await doUntilNoError(write(notes,into(textBox({"placeholder" : "Enter Notes here"})),{force: true}),10)
});

async function doUntilNoError(asyncFunction,count){
    var hasNoError = false
    var localcount =0
    do{
        try{
            await asyncFunction;
            hasNoError = true
        }catch(e)
        {
            if(localcount>=count)
                throw e
            localcount++
            await waitFor(3000)
        }
    }while(!hasNoError)
}