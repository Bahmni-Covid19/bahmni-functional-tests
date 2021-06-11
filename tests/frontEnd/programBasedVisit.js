const {
    $,
    click,
    goto,
} = require('taiko');

step("Start an Special OPD Visit", async function() {
    await click(button(toRightOf('Start OPD Visit')))
    await click('Start Special OPD Visit')
});

step("Open Programs module", async function() {
    await goto(process.env.bahmniHome)
    await click("Programs");
});

step("New Program Enrollment", async function() {
	await click('New Program Enrollement')
});