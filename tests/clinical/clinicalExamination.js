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
    await click("Clinical",{waitForNavigation:true});
});

step("Doctor captures consultation notes <notes>", async function(notes) {
    await waitFor(5000)
    // await write(notes,into(textBox({"placeholder" : "Enter Notes here"})),{force: true})
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

step("Doctor begins consultation", async function() {
    await highlight("Consultation");
    await waitFor(3000)

    await click("Consultation",{waitForNavigation:true,force:true});
});