// const { openBrowser, goto, toRightOf, textBox, into, write, dropDown, button, click, highlight, toLeftOf, checkBox, $, closeBrowser } = require('taiko');
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
        await click("Orders");
        for (test of tests) {
            await click(test)
        }        
});

step("Doctor starts prescribing medications", async function () {
    await click("Medications");
});

step("Doctor prescribes drug <drugName> at a frequency <frequency>", async function(drugName,frequency) {
        await write(drugName,into(textBox(toRightOf("Drug Name"))));
	    await dropDown({id: 'frequency'}).select(frequency)
        await click("Accept");
});

step("Doctor prescribes drug dosage <dosage> for a duration <duration>. The total is <total>", async function(dosage,duration,total) {
        await write(dosage,into(textBox(toRightOf("Dose"))));
        await write(duration,into(textBox(toRightOf("Duration"))));
        await write(total,into(textBox(toRightOf("Total"))));
        await click("Add");
});