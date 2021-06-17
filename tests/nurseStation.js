"use strict";
const path = require('path');
const {
    above,
	click,
	attach,
	fileField,
	button,
	write,
	dropDown,
	into,
	textBox,
	below
} = require('taiko');

step("Open In Patient module", async function() {
	await click("InPatient",{waitForNavigation:true})
});

step("Nurse opens admission tab", async function() {
	await click("To Admit")
});

step("Click Admit", async function() {
	await dropDown('Patient Movement').select('Admit Patient')
	await write("Adt Notes",into(textBox(below("Adt Notes"))))
	await click("Admit")

	//https://qa-02.hip.bahmni-covid19.in/bahmni/adt/views/wardList.html
	//https://qa-02.hip.bahmni-covid19.in/bahmni/adt/views/wardLayout.html

	//Patient visit Type is OPD, Do you want to close the Visit and start new IPD Visit?

});