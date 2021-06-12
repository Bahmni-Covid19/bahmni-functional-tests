const {
    $,
    click,
    scrollDown
} = require('taiko');

step("Start an IP Visit", async function() {
    await click(button(toRightOf('Start OPD Visit')))
    await click('Start IP Visit',{waitForNavigation:true})
});