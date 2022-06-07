"use strict";
const path = require('path');
const {
    above,
	click,
	attach,
	fileField,
	button,
	write,
	waitFor,
	$,
	text
} = require('taiko');
const taikoHelper = require("../bahmni-e2e-common-flows/tests/util/taikoHelper")

step("Save consultation data", async function () {
	await taikoHelper.repeatUntilNotFound($("#overlay"))
	await click("Save",{waitForNavigation:true,navigationTimeout:process.env.actionTimeout});
	await taikoHelper.repeatUntilNotFound($("#overlay"))
    await taikoHelper.repeatUntilNotFound(text("Saved"))
});