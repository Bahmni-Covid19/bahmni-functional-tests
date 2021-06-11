const {
    $,
    click,
    scrollDown,
    button
} = require('taiko');
step("Start an Emergency Visit", async function() {
    await scrollDown(button("Save"))
    await click($(".bm-pop-over-trigger"))
    await click('Start EMERGENCY visit')
});