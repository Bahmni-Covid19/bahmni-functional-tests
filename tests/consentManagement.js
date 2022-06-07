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
	clear
} = require('taiko');

var date = require("../bahmni-e2e-common-flows/tests/util/date");
var users = require("../bahmni-e2e-common-flows/tests/util/users")
step("Login to the consent request management system", async function() {
	await goto(process.env.bahmniHost+process.env.hiuURL,{waitForNavigation:true});
	await write(users.getUserNameFromEncoding(process.env.hiuUser))
	await write(users.getPasswordFromEncoding(process.env.hiuUser),into(textBox({"id":"password"})))
	await click(button("SIGN IN"),{waitForNavigation:true})
});

step("Click new consent request", async function() {
	await click("NEW CONSENT REQUEST",{waitForNavigation:true})
});

step("Find the patient <healthID> for initiating the consent request", async function (healthID) {
	await write(healthID,into(textBox(toRightOf("Patient Identifier"))))
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

	await press("Enter",{waitForNavigation:true})
});

step("Enter consent from date", async function() {
	var yesterday = date.yesterday();
	var yesterday_ddmmyyyy= date.ddmmyyyy(yesterday);
	await clear(textBox(toRightOf("Health info from")))
	await write(yesterday_ddmmyyyy)
});

step("Enter consent to date", async function() {
	var today = date.today();
	var today_ddmmyyyy= date.ddmmyyyy(today);
	//await clear(textBox(toRightOf("Health info to")))
	await write(today_ddmmyyyy,textBox(toRightOf("Health info to")))
});

step("Enter health info types <healthInfoTypes>", async function (healthInfoTypes) {
	for (healthInfoType of healthInfoTypes.rows) {
		await click(checkBox(toLeftOf(healthInfoType.cells[0])))
	}
});

step("Enter consent expiry", async function() {
	var nextYear = date.nextYear();
	var nextYear_ddmmyyyy= date.ddmmyyyyMMSS(nextYear);
	await clear(textBox(toRightOf("Consent Expiry")))
	await write(nextYear_ddmmyyyy)
});

step("Raise the consent request", async function() {
	await click("REQUEST CONSENT",{waitForNavigation:true})
});

step("verify the prescription details recieved", async function() {
	console.log("todo verify the prescription details")
});

step("Logout of HIU", async function() {
	await click(button("LOGOUT"))
});

step("reload the consent request page", async function () {
    await reload(process.env.bahmniHost+process.env.hiuURL, { navigationTimeout: 10000 })
});