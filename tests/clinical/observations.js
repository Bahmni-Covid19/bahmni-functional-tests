"use strict";
const {
    click,
    waitFor,
    toRightOf, 
    textBox, 
    into, 
	write, 
	$,
	highlight,
} = require('taiko');
const taikoHelper = require("../util/taikoHelper")

step("Enter Pulse(/min)", async function() {
	await write("70",into(textBox(toRightOf("Pulse"))));
});

step("Enter Temperature (F)", async function() {
	await write("99",into(textBox(toRightOf("Temperature"))));
});

step("Enter RR (/min)", async function() {
	await write("99",into(textBox(toRightOf("RR"))));
});

step("Enter SPO2 (%)", async function() {
	await write("99",into(textBox(toRightOf("SPO2"))));
});

step("Enter systolic, diastolic", async function () {
	await write("110",into(textBox(toRightOf("Systolic"))));
	await write("110",into(textBox(toRightOf("Diastolic"))));
});

step("Enter posture", async function () {
	await click("Sitting",toRightOf("Posture"));
});

step("Click Vitals", async function() {
	await waitFor('Vitals')
	await click("Vitals",{waitForNavigation:true,navigationTimeout:process.env.actionTimeout})
	await taikoHelper.repeatUntilNotFound($("#overlay"))
});