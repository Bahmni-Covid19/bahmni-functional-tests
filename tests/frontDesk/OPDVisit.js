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
} = require('taiko');

step("Click Start OPD Visit", async function () {
    await click("Start OPD Visit",{waitForNavigation:true});
});
