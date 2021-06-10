 const { toRightOf, textBox, into, write, dropDown, click } = require('taiko');
// (async () => {
//     try {
//         //close the visit

//         //post
//     } catch (error) {
//         console.error(error);
//     } finally {
//         await closeBrowser();
//     }
// })();

step("Doctor must be able to prescribe tests <tests>", async function(tests) {
        await click("Orders",{force: true});
        for (test of tests.rows) {
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