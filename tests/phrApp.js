const axios = require('axios')
var users = require('./util/users')
var fileExtension = require('./util/fileExtension')
const child_process = require('child_process');

step("Login to PHR app", async function() {
	var data = await axios.post(process.env.consentManagement+process.env.authenticationRequest, {
		"username": users.getUserNameFromEncoding(process.env.PHR_user),
		"password": users.getPasswordFromEncoding(process.env.PHR_user),
		"grantType": "password",
		headers: {
			'accept': `application/json`,
			'Content-Type': `application/json`,
		}
	});

	gauge.dataStore.scenarioStore.put('X-AUTH-TOKEN',data.data.token)
	console.log(data.data.token)
})

step("Fetch the latest request", async function () {
	listOfRequests = await axios.get(process.env.consentManagement+process.env.patientRequests, {
		headers: {
			'accept': `application/json`,
			'Content-Type': `application/json`,
			'X-AUTH-TOKEN':gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'),	
		}
	});

	const result = listOfRequests.data.consents.requests.filter(request => request.status == 'REQUESTED');

	var request = result[0]
	console.log('PHR_RequestId '+ request.id)
	console.log('PHR_From '+ request.permission.dateRange.from)
	console.log('PHR_To'+ request.permission.dateRange.to)

	gauge.dataStore.scenarioStore.put('PHR_RequestId', request.id)
	gauge.dataStore.scenarioStore.put('PHR_From', request.permission.dateRange.from)
	gauge.dataStore.scenarioStore.put('PHR_To', request.permission.dateRange.to)
});


step("Approve the consent request", async function() {
	var patientLinks = await axios.get(process.env.consentManagement+"/patients/links", {
		headers: {
			'accept': `application/json`,
			'Content-Type': `application/json`,
			'X-AUTH-TOKEN':gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'),	
		}
	});
	//console.log(patientLinks)
	approveConsentRequestURL = process.env.approveConsentRequest;

	var requestId=gauge.dataStore.scenarioStore.get('PHR_RequestId')
	var temporaryToken = gauge.dataStore.scenarioStore.get('temporaryToken')

	console.log('<bahmniHost>'+process.env.consentManagement)	
	console.log('<request_id>'+requestId)
	console.log('<X-Auth-Token>'+temporaryToken)
	console.log('<careContextReference>'+patientLinks.data.patient.links[0].careContexts[0].referenceNumber)
	console.log('<patientReference>'+patientLinks.data.patient.links[0].referenceNumber)
	console.log('<hip_id>'+patientLinks.data.patient.links[0].hip.id)

	var curlExecCommand = fileExtension.parseContent("./data/consentRequest/approve/curl.txt")
	.replace('<bahmniHost>',process.env.consentManagement)	
	.replace('<request_id>',requestId)
	.replace('<X-Auth-Token>',temporaryToken)
	.replace('<careContextReference>',patientLinks.data.patient.links[0].careContexts[0].referenceNumber)
	.replace('<patientReference>',patientLinks.data.patient.links[0].referenceNumber)
	.replace('<hip_id>',patientLinks.data.patient.links[0].hip.id)

	console.log(curlExecCommand)
	var result = child_process.execSync(curlExecCommand);
	console.log(result.toString('UTF8'))
});

step("Reject the consent request", async function() {
	rejectConsentRequestURL = process.env.rejectConsentRequest

	var data = await axios.post(process.env.consentManagement+process.env.rejectConsentRequestURL, {
		"username": users.getUserNameFromEncoding(gauge.env.PHR_user),
		"password": users.getUserNameFromEncoding(gauge.env.PHR_user),
		"grantType": "password",	
		headers: {
			'accept': `application/json`,
			'Content-Type': `application/json`,
			'X-AUTH-TOKEN':gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'),	
			'request-id':gauge.dataStore.scenarioStore.get('PHR_RequestId'),
		}
	});

	console.log(data)
});

step("Get the temporary token", async function() {
	var verifyPin = "curl -X POST '"+process.env.consentManagement+"/patients/verify-pin' -H  'accept: application/json' -H  'X-AUTH-TOKEN: "
	+gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN')
	+"' -H  'Content-Type: application/json' -d '{\"requestId\":\""+listOfRequests.data.consents.requests[0].id+"\",\"pin\":\"1234\",\"scope\":\"consentrequest.approve\"}'"
	var result = child_process.execSync(verifyPin)
	var temporaryToken = (JSON.parse(result.toString('UTF8'))).temporaryToken
	console.log("The temporary Token "+temporaryToken)
	gauge.dataStore.scenarioStore.put('temporaryToken',temporaryToken)
});