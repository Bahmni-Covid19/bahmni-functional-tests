const {
	write,
	click,
	into,
	textBox,
	checkBox,
	button,
	toLeftOf,
	toRightOf,
	goto,
	intercept,
	press,
	clear,
	text,
	$,
	waitFor,
	reload,
	below,
	highlight
} = require('taiko');

var date = require("../bahmni-e2e-common-flows/tests/util/date");
var users = require("../bahmni-e2e-common-flows/tests/util/users")
var assert = require("assert");
const console = require('console');
step("Login to the consent request management system", async function () {
	await goto(process.env.bahmniHost + process.env.hiuURL, { waitForNavigation: true });
	await write(users.getUserNameFromEncoding(process.env.hiuUser))
	await write(users.getPasswordFromEncoding(process.env.hiuUser), into(textBox({ "id": "password" })))
	await click(button("SIGN IN"), { waitForNavigation: true })
});

step("Click new consent request", async function () {
	await click("NEW CONSENT REQUEST", { waitForNavigation: true })
});

step("Find the patient <healthID> for initiating the consent request", async function (healthID) {
	await write(healthID, into(textBox(toRightOf("Patient Identifier"))))
	// patientResponse = {"patient":{"id":healthID+"@sbx","name":"cancer patient"}}

	// await intercept(process.env.bahmniHost+ "/hiu-api/v1/patients/"+healthID+"@sbx", (request) => {
	//     request.respond({
	//         method: 'GET',
	//         hostname: process.env.bahmniHost,
	//         body: patientResponse,
	//         headers: {
	//             'Content-Type': 'application/json',
	//             'content-length': patientResponse.length,
	//         }
	//     })
	// })

	await press("Enter", { waitForNavigation: true })
});

step("Enter consent from date", async function () {
	var yesterday = date.yesterday();
	var yesterday_ddmmyyyy = date.ddmmyyyy(yesterday);
	await clear(textBox(toRightOf("Health info from")))
	await write(yesterday_ddmmyyyy)
});

step("Enter consent to date", async function () {
	var today = date.today();
	var today_ddmmyyyy = date.ddmmyyyy(today);
	//await clear(textBox(toRightOf("Health info to")))
	await write(today_ddmmyyyy, textBox(toRightOf("Health info to")))
});

step("Enter health info types <healthInfoTypes>", async function (healthInfoTypes) {
	for (healthInfoType of healthInfoTypes.rows) {
		await click(checkBox(toLeftOf(healthInfoType.cells[0])))
	}
});

step("Enter consent expiry", async function () {
	var nextYear = date.nextYear();
	var nextYear_ddmmyyyy = date.ddmmyyyyMMSS(nextYear);
	await clear(textBox(toRightOf("Consent Expiry")))
	await write(nextYear_ddmmyyyy)
	await waitFor(1000)
});

step("Raise the consent request", async function () {
	await click("REQUEST CONSENT", { waitForNavigation: true })
	await waitFor(async () => (await text("Consent request initiated!").exists()))
	assert.ok(await text("Consent request initiated!").exists())
});

step("Logout of HIU", async function () {
	await click(button("LOGOUT"))
});

step("reload the consent request page", async function () {
	await reload({ waitForNavigation: true })
});

step("Open the consent request for <abhaAddress>", async function (abhaAddress) {
	var maxRetry = 6
	while (maxRetry > 0) {
		await reload({ waitForNavigation: true });
		await waitFor(async () => (await text(abhaAddress).exists()))
		try {
			await $("//*[text()='Consent granted on']/ancestor::TABLE//TR[1]/TD[text()='Consent Granted']").exists();
			await click($("//*[text()='Consent granted on']/ancestor::TABLE//TR[1]/TD/A"), { waitForNavigation: true })
			maxRetry = 0
		} catch (e) {
			maxRetry = maxRetry - 1;
			console.log(e.message + " Waiting for 5 seconds and reload the Consent Request Lists page. Remaining attempts " + maxRetry)
			await waitFor(5000)
		}
	}
});

step("Verify Patient data is fetched.", async function () {
	var maxRetry = 6
	while (maxRetry > 0) {
		await reload({ waitForNavigation: true });
		await waitFor(1000)
		if (await text("Encounter").exists()) {
			maxRetry = 0
		} else {
			maxRetry = maxRetry - 1;
			console.log(" Waiting for 5 seconds and reload the Patient data page. Remaining attempts " + maxRetry)
			await waitFor(4000)
		}
	}
});

step("Validate Chief Complaint and notes in HIU", async function () {
	//To be added later
});
step("Validate Diagnosis in HIU", async function () {
	assert.ok(await text("Cardiac arrest", below("Condition")).exists())
});
step("Validate Condition in HIU", async function () {
	assert.ok(await text("Diabetes II, uncomplicated", below("Condition", toLeftOf("active"))).exists())

});
step("Validate Consultation Notes in HIU", async function () {
	await highlight(text(gauge.dataStore.scenarioStore.get("consultationNotes"), below("Value"),toRightOf(text("Consultation Note", below("Observation")))))
	assert.ok(await text(gauge.dataStore.scenarioStore.get("consultationNotes"), below("Value"),toRightOf(text("Consultation Note", below("Observation")))).exists());
});
step("Validate Lab Orders in HIU", async function () {
	//To be added later
});
step("Validate Medications in HIU", async function () {
	//To be added later
});
step("Validate Patient Documents in HIU", async function () {
	//To be added later
});