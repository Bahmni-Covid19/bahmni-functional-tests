"use strict";
var assert = require("assert");
var _fileExtension = require("./util/fileExtension")
var _requestResponse = require("./util/requestResponse");

step("Verify openmrs OPD patient details with mobileNumber <mobileNumber>", async function (mobileNumber) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ process.env.openMRSRestAPIPrefix+ "/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var OPDPrescriptions = await _requestResponse.makeOpenVisitCall(patientUUID,"OPD",process.env.visitPrescriptions)
    assert.ok(OPDPrescriptions!=null && OPDPrescriptions.prescriptions!=null)
    for(var prescription of OPDPrescriptions.prescriptions){
        assert.ok(prescription.careContext!=null)
        assert.ok(prescription.careContext.careContextReference=="OPD")
        assert.ok(prescription.bundle!=null)
        var prescriptionFile = gauge.dataStore.scenarioStore.get("prescriptions")
        var prescriptionDetails = JSON.parse(_fileExtension.parseContent(prescriptionFile))
        var medication = parseInt(prescriptionDetails.dose).toFixed(1)+" "+prescriptionDetails.units+" "+ prescriptionDetails.frequency+"  "+prescriptionDetails.duration+" Day(s) "
        assert.equal(prescription.bundle.entry[4].resource.dosageInstruction[0].text,medication)
    }

    var OPDDiagnostics = await _requestResponse.makeOpenVisitCall(patientUUID,"OPD",process.env.visitDiagnosticReports)
    assert.ok(OPDDiagnostics!=null && OPDDiagnostics.diagnosticReports!=null)
    // for(var diagnosticReport of OPDPrescriptions.diagnosticReports){
    //     assert.ok(diagnosticReport.careContext!=null)
    //     assert.ok(diagnosticReport.careContextReference=="OPD")
    //     assert.ok(diagnosticReport.bundle!=null)
    // }
});

step("Verify openmrs OPD patient details with mobileNumber <mobileNumber> firstName <firstName> lastName <lastName>", async function (mobileNumber,firstName,lastName) {
    var prescriptionFile = "./data/opd/prescriptionFlow/prescriptions.json";
    gauge.dataStore.scenarioStore.put("prescriptions",prescriptionFile)

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ process.env.openMRSRestAPIPrefix+ "/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var OPDPrescriptions = await _requestResponse.makeOpenVisitCall(patientUUID,"OPD",process.env.visitPrescriptions)
    assert.ok(OPDPrescriptions!=null && OPDPrescriptions.prescriptions!=null)
    for(var prescription of OPDPrescriptions.prescriptions){
        assert.ok(prescription.careContext!=null)
        assert.ok(prescription.careContext.careContextReference=="OPD")
        assert.ok(prescription.bundle!=null)
        var prescriptionFile = gauge.dataStore.scenarioStore.get("prescriptions")
        var prescriptionDetails = JSON.parse(_fileExtension.parseContent(prescriptionFile))
        var medication = parseInt(prescriptionDetails.dose).toFixed(1)+" "+prescriptionDetails.units+" "+ prescriptionDetails.frequency+"  "+prescriptionDetails.duration+" Day(s) "
        assert.equal(prescription.bundle.entry[4].resource.dosageInstruction[0].text,medication)
    }

    var OPDDiagnostics = await _requestResponse.makeOpenVisitCall(patientUUID,"OPD",process.env.visitDiagnosticReports)
    assert.ok(OPDDiagnostics!=null && OPDDiagnostics.diagnosticReports!=null)
    var verified = false
    for(var diagnosticReport of OPDDiagnostics.diagnosticReports){
        if(diagnosticReport.careContext==null)
            continue
        assert.ok(diagnosticReport.careContext.careContextReference=="OPD")
        assert.ok(diagnosticReport.bundle!=null)
        for(var entry of diagnosticReport.bundle.entry){
            if(entry.fullUrl.startsWith('DiagnosticReport')){
                verified = true
                assert.ok(entry.resource.result.length==1)
            }
        }
    }
    assert.ok(verified==true,"At least one diagnostic report should be available")
});
step("Verify openmrs Special OPD patient details with mobileNumber <mobileNumber>", async function(mobileNumber) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ process.env.openMRSRestAPIPrefix+ "/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var specialOPDPrescriptions = await _requestResponse.makeOpenProgramCall(patientUUID,"HIV%20Program","1234",process.env.programPrescriptions)
    var specialOPDDiagnostics = await _requestResponse.makeOpenProgramCall(patientUUID,"HIV%20Program","1234",process.env.programDiagnosticReports)
});

step("Verify openmrs IPD patient details with mobileNumber <mobileNumber>", async function(mobileNumber) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ process.env.openMRSRestAPIPrefix+ "/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;
    var IPDPrescriptions = await _requestResponse.makeOpenVisitCall(patientUUID,"IPD",process.env.visitPrescriptions)
    var IPDDiagnostics = await _requestResponse.makeOpenVisitCall(patientUUID,"IPD",process.env.visitDiagnosticReports)
});

step("Verify openmrs lab patient details with mobileNumber <arg0>", async function(arg0) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ process.env.openMRSRestAPIPrefix+ "/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;

    var labPrescriptions = await _requestResponse.makeOpenVisitCall(patientUUID,"lab",process.env.visitPrescriptions)
    var labDiagnostics =await _requestResponse.makeOpenVisitCall(patientUUID,"lab",process.env.visitDiagnosticReports)

    var pharmacyPrescriptions = await _requestResponse.makeOpenVisitCall(patientUUID,"pharmacy",process.env.visitPrescriptions)
    var pharmacyDiagnostics = await _requestResponse.makeOpenVisitCall(patientUUID,"pharmacy",process.env.visitDiagnosticReports)
});

step("Verify openmrs pharmacy patient details with mobileNumber <arg0>", async function(arg0) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName")

    var patientName = firstName+" "+lastName
    var patientYearOfBirth = "2000"
    var patientGender = "F"
    var phoneNumber = mobileNumber
    var existingPatients = process.env.bahmniHost+ process.env.openMRSRestAPIPrefix+ "/existingPatients?patientName="+patientName
    +"&patientYearOfBirth="+patientYearOfBirth+"&patientGender="+patientGender+"&phoneNumber="+phoneNumber;
    
    var existingPatientsResponse = await _requestResponse.getOpenMRSResponse(existingPatients)

    const patientUUID = existingPatientsResponse.data[0].uuid;

    var pharmacyPrescriptions = await _requestResponse.makeOpenVisitCall(patientUUID,"pharmacy",process.env.visitPrescriptions)
    var pharmacyDiagnostics = await _requestResponse.makeOpenVisitCall(patientUUID,"pharmacy",process.env.visitDiagnosticReports)
});


step("Put first name <firstName> last name <lastName>", async function(firstName, lastName) {
    gauge.dataStore.scenarioStore.put("patientFirstName",firstName)
    gauge.dataStore.scenarioStore.put("patientLastName",lastName)
});