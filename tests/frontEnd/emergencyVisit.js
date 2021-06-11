const {
    $,
    click,
    dropDown,
} = require('taiko');
step("Start an Emergency Visit", async function() {
    await click(button(toRightOf('Start OPD Visit')))
    await click('Start EMERGENCY visit')
});