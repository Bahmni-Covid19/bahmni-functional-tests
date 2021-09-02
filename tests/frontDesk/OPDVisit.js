/* globals gauge*/
"use strict";

const {
    toRightOf,
    write,
    click,
    into,
    textBox,
    waitFor,
    press,
    $,
    scrollTo
} = require('taiko');
var taikoHelper = require("../util/taikoHelper");

step("Click Start OPD Visit", async function () {
    await scrollTo("Start OPD Visit")
    await click("Start OPD Visit",{waitForNavigation:true});
    await taikoHelper.repeatUntilNotFound($("#overlay"))
});
