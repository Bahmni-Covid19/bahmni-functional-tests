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
    await waitFor(async () => (await $("a#patients-link.back-btn").exists()))
    await click($("a#patients-link.back-btn"),{waitForNavigation:true});
    await waitFor(async () => (await $("a.back-btn").isVisible()))
    await click($("a.back-btn",{waitForNavigation:true}));
});