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
    text,
    link,
    scrollTo
} = require('taiko');
var taikoHelper = require("../util/taikoHelper");

step("Click Start IPD Visit", async function() {
    await scrollTo("Start OPD Visit")
    await click(button(toRightOf('Start OPD Visit'), within($(".submit-btn-container"))));
    await click('Start IPD visit',{waitForNavigation:true})
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});

step("Open the newly created patient details", async function() {
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");
    await click(link(patientIdentifierValue));
    await taikoHelper.repeatUntilNotFound($("#overlay"))    
});