const {
    $,
    click,
    button,
    toRightOf,
    waitFor,
    goto,
    write,
    into,
    textBox,
    dropDown,
    highlight,
    toLeftOf,
    within,
    text
} = require('taiko');
var taikoHelper = require("../util/taikoHelper");

step("Click Start IPD Visit", async function() {
    await click(button(toRightOf('Start OPD Visit'), within($(".submit-btn-container"))));
    await click('Start IPD visit',{waitForNavigation:true})
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});
