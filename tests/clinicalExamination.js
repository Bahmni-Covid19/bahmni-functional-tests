"use strict";
const path = require('path');
const {
    write,
    click,
    into,
    textBox,
} = require('taiko');

step("Doctor opens the consultation tab for patient <firstName> <lastName>", async function (firstName, lastName) {
	await click("Clinical");
    await click(firstName+" "+lastName);
    await click("OK");
    await click("Consultation");
    await click("OK");
});

step("Doctor captures consultation notes <notes>", async function(notes) {
	await click("Consultation");
	await write(notes,into(textBox({"placeholder" : "Enter Notes here"})));
});