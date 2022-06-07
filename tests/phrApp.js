const axios = require('axios')
var users = require('../bahmni-e2e-common-flows/tests/util/users')
var fileExtension = require('../bahmni-e2e-common-flows/tests/util/fileExtension')
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

step("Deny the consent request", async function() {
	var patientLinks = await axios.get(process.env.consentManagement+"/patients/links", {
		headers: {
			'accept': `application/json`,
			'Content-Type': `application/json`,
			'X-AUTH-TOKEN':gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'),	
		}
	});
	var requestId=gauge.dataStore.scenarioStore.get('PHR_RequestId')
	console.log('<bahmniHost>'+process.env.consentManagement)	
	console.log('<request_id>'+requestId)
	console.log('<X-Auth-Token>'+gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'))

	var curlExecCommand = fileExtension.parseContent("./data/consentRequest/deny/curl.txt")
	.replace('<bahmniHost>',process.env.consentManagement)	
	.replace('<request_id>',requestId)
	.replace('<X-Auth-Token>',gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'))

	console.log(curlExecCommand)
	var result = child_process.execSync(curlExecCommand);
	console.log(result.toString('UTF8'))
});


step("Approve the consent request <healthInfoTypes>", async function(healthInfoTypes) {
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

	var hiTypes = ""
	for (healthInfoType of healthInfoTypes.rows) {
		if(hiTypes!="")
			hiTypes = hiTypes.concat(",")
		hiTypes = hiTypes.concat("\"" +healthInfoType.cells[0]+"\"")
	}
//OPConsultation,DiagnosticReport,Prescription,ImmunizationRecord,DischargeSummary,HealthDocumentRecord,WellnessRecord
	console.log('<bahmniHost>'+process.env.consentManagement)	
	console.log('<request_id>'+requestId)
	console.log('<X-Auth-Token>'+temporaryToken)
	console.log('<careContextReference>'+patientLinks.data.patient.links[0].careContexts[0].referenceNumber)
	console.log('<patientReference>'+patientLinks.data.patient.links[0].referenceNumber)
	console.log('<hip_id>'+patientLinks.data.patient.links[0].hip.id)
	console.log('<hiTypes>',hiTypes)

	var curlExecCommand = fileExtension.parseContent("./data/consentRequest/approve/curl.txt")
	.replace('<bahmniHost>',process.env.consentManagement)	
	.replace('<request_id>',requestId)
	.replace('<X-Auth-Token>',temporaryToken)
	.replace('<careContextReference>',patientLinks.data.patient.links[0].careContexts[0].referenceNumber)
	.replace('<patientReference>',patientLinks.data.patient.links[0].referenceNumber)
	.replace('<hip_id>',patientLinks.data.patient.links[0].hip.id)
	.replace('<hiTypes>',hiTypes)

	console.log(curlExecCommand)
	var result = child_process.execSync(curlExecCommand);
	console.log(result.toString('UTF8'))
	gauge.dataStore.scenarioStore.put("ApprovalArtifacts",JSON.parse(result.toString('UTF8')).consents)
});

step("Revoke the consent request <healthInfoTypes>", async function(healthInfoTypes) {
	var patientLinks = await axios.get(process.env.consentManagement+"/patients/links", {
		headers: {
			'accept': `application/json`,
			'Content-Type': `application/json`,
			'X-AUTH-TOKEN':gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN'),	
		}
	});
	//console.log(patientLinks)
	approveConsentRequestURL = process.env.approveConsentRequest;
	approvalArtifact = gauge.dataStore.scenarioStore.get("ApprovalArtifacts")

	var requestId=approvalArtifact[0].id
	var temporaryToken = gauge.dataStore.scenarioStore.get('temporaryToken_Revoke')

	var hiTypes = ""
	for (healthInfoType of healthInfoTypes.rows) {
		if(hiTypes!="")
			hiTypes = hiTypes.concat(",")
		hiTypes = hiTypes.concat("\"" +healthInfoType.cells[0]+"\"")
	}

	console.log('<bahmniHost>'+process.env.consentManagement)	
	console.log('<request_id>'+requestId)
	console.log('<X-Auth-Token>'+temporaryToken)
	console.log('<careContextReference>'+patientLinks.data.patient.links[0].careContexts[0].referenceNumber)
	console.log('<patientReference>'+patientLinks.data.patient.links[0].referenceNumber)
	console.log('<hip_id>'+patientLinks.data.patient.links[0].hip.id)
	console.log('<hiTypes>',hiTypes)
	
	var curlExecCommand = fileExtension.parseContent("./data/consentRequest/revoke/curl.txt")
	.replace('<bahmniHost>',process.env.consentManagement)	
	.replace('<request_id>',requestId)
	.replace('<X-Auth-Token>',temporaryToken)
	.replace('<careContextReference>',patientLinks.data.patient.links[0].careContexts[0].referenceNumber)
	.replace('<patientReference>',patientLinks.data.patient.links[0].referenceNumber)
	.replace('<hip_id>',patientLinks.data.patient.links[0].hip.id)
	.replace('<hiTypes>',hiTypes)

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

step("Get the temporary token for revoke", async function() {
	var approvalArtifact = gauge.dataStore.scenarioStore.get("ApprovalArtifacts")

	var verifyPin = "curl -X POST '"+process.env.consentManagement+"/patients/verify-pin' -H  'accept: application/json' -H  'X-AUTH-TOKEN: "
	+gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN')
	+"' -H  'Content-Type: application/json' -d '{\"requestId\":\""+approvalArtifact[0].id+"\",\"pin\":\"1234\",\"scope\":\"consentrequest.approve\"}'"
	
	var result = child_process.execSync(verifyPin)
	console.log(verifyPin)
	var temporaryToken = (JSON.parse(result.toString('UTF8'))).temporaryToken
	console.log("The temporary Revoke Token "+temporaryToken)
	gauge.dataStore.scenarioStore.put('temporaryToken_Revoke',temporaryToken)
});

step("Get the temporary token for deny", async function() {
	var verifyPin = "curl -X POST '"+process.env.consentManagement+"/patients/verify-pin' -H  'accept: application/json' -H  'X-AUTH-TOKEN: "
	+gauge.dataStore.scenarioStore.get('X-AUTH-TOKEN')
	+"' -H  'Content-Type: application/json' -d '{\"requestId\":\""+listOfRequests.data.consents.requests[0].id+"\",\"pin\":\"1234\",\"scope\":\"consentrequest.deny\"}'"
	var result = child_process.execSync(verifyPin)
	var temporaryToken = (JSON.parse(result.toString('UTF8'))).temporaryToken
	console.log("The temporary Token "+temporaryToken)
	gauge.dataStore.scenarioStore.put('temporaryToken',temporaryToken)
});

