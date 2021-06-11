"use strict";
var _requestResponse = require("./util/requestResponse");
var _date = require("./util/date");

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

    var yesterday = _date.getddmmyyyyFormattedDate(_date.yesterday())
    var today = _date.getddmmyyyyFormattedDate(_date.today())

    var OPDPrescriptions = process.env.bahmniHost
    + "/openmrs/ws/rest/v1/hip/prescriptions/visit?patientId="
    +existingPatientsResponse.data[0].uuid
    +"&visitType=OPD&fromDate="+yesterday+"&toDate="+today;

    var prescriptionsVisitResponse = await _requestResponse.getOpenMRSResponse(OPDPrescriptions)
    console.log(prescriptionsVisitResponse.data);
    console.log(prescriptionsVisitResponse.status);
    console.log(prescriptionsVisitResponse.statusText);
    console.log(prescriptionsVisitResponse.headers);
    console.log(prescriptionsVisitResponse.config);

    var OPDDiagnosticReports = process.env.bahmniHost+ "/openmrs/ws/rest/v1/hip/diagnosticReports/visit?"
    +"patientId="+existingPatientsResponse.data[0].uuid
    +"&fromDate="+yesterday+"&toDate="+today
    +"&visitType=OPD";

    var OPDDiagnosticResponse = await _requestResponse.getOpenMRSResponse(OPDDiagnosticReports)
    console.log(OPDDiagnosticResponse.data);
    console.log(OPDDiagnosticResponse.status);
    console.log(OPDDiagnosticResponse.statusText);
    console.log(OPDDiagnosticResponse.headers);
    console.log(OPDDiagnosticResponse.config);

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

