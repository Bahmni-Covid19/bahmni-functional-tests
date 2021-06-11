const {
    $,
    click,
    scrollDown
} = require('taiko');

step("Start an Special OPD Visit", async function() {
	await scrollDown($(".bm-pop-over-trigger"))
    await click($(".bm-pop-over-trigger"))
    await click('Start Special OPD Visit')
});