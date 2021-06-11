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

    await doUntilNoError(write(notes,into(textBox({"placeholder" : "Enter Notes here"})),{force: true}),'TextBox[placeholder="Enter Notes here"] not found')
});

async function doUntilNoError(asyncFunction){
    var hasNoError = false
    do{
        try{
            await asyncFunction;
            hasNoError = true
        }catch(e)
        {
            if(e.message!=message)
                throw e
            await waitFor(3000)
        }
    }while(!hasNoError)
}