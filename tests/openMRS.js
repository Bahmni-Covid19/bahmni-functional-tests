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

    await _requestResponse.makeOpenMRSCall(existingPatientsResponse.data[0].uuid,"OPD",process.env.visitPrescriptions)
    await _requestResponse.makeOpenMRSCall(existingPatientsResponse.data[0].uuid,"OPD",process.env.visitDiagnosticReports)

    // var programPrescriptions = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/prescriptions/program?"+
    // +"patientId="+existingPatientsResponse.data[0].uuid
    // +"&fromDate="+yesterday+"&toDate="+today
    // +"&visitType=OPD";

    // var programPrescriptionsResposne = await _requestResponse.getOpenMRSResponse(programPrescriptions)
    // console.log(programPrescriptionsResposne.data);
    // console.log(programPrescriptionsResposne.status);
    // console.log(programPrescriptionsResposne.statusText);
    // console.log(programPrescriptionsResposne.headers);
    // console.log(programPrescriptionsResposne.config);

    // var programDiagnosticReports = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/diagnosticReports/program?"+
    // +"patientId="+existingPatientsResponse.data[0].uuid
    // +"&fromDate="+yesterday+"&toDate="+today
    // +"&visitType=OPD";

    // var programDiagnosticResponse = await _requestResponse.getOpenMRSResponse(programDiagnosticReports)
    // console.log(programDiagnosticResponse.data);
    // console.log(programDiagnosticResponse.status);
    // console.log(programDiagnosticResponse.statusText);
    // console.log(programDiagnosticResponse.headers);
    // console.log(programDiagnosticResponse.config);
});

