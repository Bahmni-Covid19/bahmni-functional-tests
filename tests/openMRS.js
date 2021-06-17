"use strict";
var _requestResponse = require("./util/requestResponse");

step("Verify openmrs OPD patient details with mobileNumber <mobileNumber>", async function (mobileNumber) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var OPDPrescriptions = await _requestResponse.makeOpenMRSCall(patientUUID,"OPD",process.env.visitPrescriptions)
    var OPDDiagnostics = await _requestResponse.makeOpenMRSCall(patientUUID,"OPD",process.env.visitDiagnosticReports)
});

step("Verify openmrs Special OPD patient details with mobileNumber <mobileNumber>", async function(mobileNumber) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var specialOPDPrescriptions = await _requestResponse.makeOpenMRSCall(patientUUID,"Special%20OPD",process.env.visitPrescriptions)
    var specialOPDDiagnostics = await _requestResponse.makeOpenMRSCall(patientUUID,"Special%20OPD",process.env.visitDiagnosticReports)
});

step("Verify openmrs IPD patient details with mobileNumber <arg0>", async function(arg0) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var IPDPrescriptions = await _requestResponse.makeOpenMRSCall(patientUUID,"IPD",process.env.visitPrescriptions)
    var IPDDiagnostics = await _requestResponse.makeOpenMRSCall(patientUUID,"IPD",process.env.visitDiagnosticReports)
});

step("Verify openmrs lab patient details with mobileNumber <arg0>", async function(arg0) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;

    var labPrescriptions = await _requestResponse.makeOpenMRSCall(patientUUID,"lab",process.env.visitPrescriptions)
    var labDiagnostics =await _requestResponse.makeOpenMRSCall(patientUUID,"lab",process.env.visitDiagnosticReports)

    var pharmacyPrescriptions = await _requestResponse.makeOpenMRSCall(patientUUID,"pharmacy",process.env.visitPrescriptions)
    var pharmacyDiagnostics = await _requestResponse.makeOpenMRSCall(patientUUID,"pharmacy",process.env.visitDiagnosticReports)
});

step("Verify openmrs pharmacy patient details with mobileNumber <arg0>", async function(arg0) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;

    var pharmacyPrescriptions = await _requestResponse.makeOpenMRSCall(patientUUID,"pharmacy",process.env.visitPrescriptions)
    var pharmacyDiagnostics = await _requestResponse.makeOpenMRSCall(patientUUID,"pharmacy",process.env.visitDiagnosticReports)
});