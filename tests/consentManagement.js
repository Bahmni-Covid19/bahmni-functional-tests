var _fileExtension = require("./util/fileExtension");

step("Create a consent request for the healthID <healthID>", async function(healthID) {
	requestId = "b7648e71-4172-4550-bcbb-5479d3027d77"
	timestamp = new Date(Date.now()).toISOString()
	transactionId = "b1s2c932-2f70-3ds3-a3b5-2sfd46b12a18d"

	const lastYear = new Date();
	lastYear.setFullYear(lastYear.getFullYear()-1);
	fromDate = lastYear.toISOString();

	const nextYear = new Date();
	nextYear.setFullYear(nextYear.getFullYear()+1);
	toDate = nextYear.toISOString();

	healthID = "firstMiddleLast@sbx"
	dataPushURL = process.env.dataPushURL
	
	var request = _fileExtension.parseContent("./data/consentRequest/simple.txt")
		.replace('<requestId>',requestId)
		.replace('<timestamp>',timestamp)
		.replace('<healthID>',healthID)
		.replace('<dataPushURL>',dataPushURL)
		.replace('<fromDate>',fromDate)
		.replace('<toDate>',toDate)
		.replace('<expiryDate>',nextYear.toISOString())

	console.log(request)
});