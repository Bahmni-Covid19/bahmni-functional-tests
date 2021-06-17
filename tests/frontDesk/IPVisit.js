const {
    $,
    click,
    button,
    toRightOf,
    waitFor
} = require('taiko');

step("Click Start IPD Visit", async function() {
    await click(button(toRightOf('Start OPD Visit')))
    await click('Start IPD visit',{waitForNavigation:true})
});


step("Go back from patient tab to home", async function () {
    await click($("a#patients-link.back-btn"),{waitForNavigation:true});
    await waitFor(1000)
    await click($("a.back-btn",{waitForNavigation:true}));
});