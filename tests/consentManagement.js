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
} = require('taiko');

var _date = require("./util/date");

// step("Create a consent request for the healthID <healthID>", async function(healthID) {
	
// 	// requestId = "b7648e71-4172-4550-bcbb-5479d3027d77"
// 	// timestamp = new Date(Date.now()).toISOString()
// 	// transactionId = "b1s2c932-2f70-3ds3-a3b5-2sfd46b12a18d"

// 	// const lastYear = new Date();
// 	// lastYear.setFullYear(lastYear.getFullYear()-1);
// 	// fromDate = lastYear.toISOString();

// 	// const nextYear = new Date();
// 	// nextYear.setFullYear(nextYear.getFullYear()+1);
// 	// toDate = nextYear.toISOString();

// 	// healthID = "firstMiddleLast@sbx"
// 	// dataPushURL = process.env.dataPushURL
	
// 	// var consentRequest = _fileExtension.parseContent("./data/consentRequest/simple.txt")
// 	// 	.replace('<requestId>',requestId)
// 	// 	.replace('<timestamp>',timestamp)
// 	// 	.replace('<healthID>',healthID)
// 	// 	.replace('<dataPushURL>',dataPushURL)
// 	// 	.replace('<fromDate>',fromDate)
// 	// 	.replace('<toDate>',toDate)
// 	// 	.replace('<expiryDate>',nextYear.toISOString())

// 	// axios({
// 	// 	method: 'post',
// 	// 	url: '/login',
// 	// 	data: consentRequest
// 	// })
// 	// .then((response) => {
// 	// 	console.log(response);
// 	//   }, 
// 	// (error) => {
// 	// 	console.log(error);
// 	// });
// });

step("Login to the consent request management system", async function() {
	await goto(process.env.bahmniHost+process.env.hiuURL);
	await write(process.env.hiuUser)
	await write(process.env.hiuPassword,into(textBox({"id":"password"})))
	await click(button("SIGN IN"))

});

step("Create new consent request for healthID <healthID> <healthInfoTypes>", async function(healthID,healthInfoTypes) {
	await click("NEW CONSENT REQUEST")
	await write(healthID,into(textBox(toRightOf("Patient Identifier"))))
	patientResponse = {"patient":{"id":healthID+"@sbx","name":"cancer patient"}}

	await intercept(process.env.bahmniHost+ "/hiu-api/v1/patients/"+healthID+"@sbx", (request) => {
        request.respond({
            method: 'GET',
            hostname: process.env.bahmniHost,
            body: patientResponse,
            headers: {
                'Content-Type': 'application/json',
                'content-length': patientResponse.length,
            }
        })
    })

	await press("Enter")
	var yesterday = _date.yesterday();
	var yesterday_ddmmyyyy= _date.ddmmyyyy(yesterday);
	await write(yesterday_ddmmyyyy,into(textBox(toRightOf("Health info from"))))
	
	var today = _date.today();
	var today_ddmmyyyy= _date.ddmmyyyy(today);
	await write(today_ddmmyyyy,into(textBox(toRightOf("Health info to"))))

	for (healthInfoType of healthInfoTypes.rows) {
		await click(checkBox(toLeftOf(healthInfoType.cells[0])))
	}
	
	var nextYear = _date.nextYear();
	var nextYear_ddmmyyyy= _date.ddmmyyyy(nextYear);
	await write(nextYear_ddmmyyyy,into(textBox(toRightOf("Consent Expiry"))))

	await click("REQUEST CONSENT")
});