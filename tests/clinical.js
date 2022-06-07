const {
    $,
    click,
    goto,
    button,
    toRightOf,
    highlight,
    focus,
    dropDown,
    write,
    textBox,
    into,
    timeField,
    waitFor,
    attach,
    fileField,
    below,
    toLeftOf,
    link,
    text,
    within,
    scrollTo
} = require('taiko');
var taikoHelper = require("../bahmni-e2e-common-flows/tests/util/taikoHelper")

step("Search the newly created patient with HealthID", async function () {
    var healthID = gauge.dataStore.scenarioStore.get("healthID")
    await write(healthID, into(textBox({ "placeholder": "Search Name/Patient Identifier  ..." })))
    await click('Search',{waitForNavigation:true})
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});
