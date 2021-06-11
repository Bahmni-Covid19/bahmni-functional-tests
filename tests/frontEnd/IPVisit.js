const {
    $,
    click,
    scrollDown
} = require('taiko');

step("Start an IP Visit", async function() {
	await scrollDown($(".bm-pop-over-trigger"))
    await click($(".bm-pop-over-trigger"))
    await click('Start IP Visit')
});