# Program Based Visits
|mobileNumber|
|+91-9876543210|
## Should be able to enter program level details for a patient
Tags: prescriptions, diagnostics
* Login to Bahmni location "OPD-1" as a receptionist
* Receptionist creates the patient with mobile number <mobileNumber> and starts an Special OPD
* Doctor enrolls Patient onto "HIV Program" stage "programStage" starting "5" years ago with treatment start "2" years ago, id "1234", dr incharge "doctor" and treatment stage "Initial Stage"
* Doctor clicks consultation
* Nurse enters basic clinical details
* Nurse captures BP, sugar checkup
* Doctor captures the consultation notes "Consultation Notes" for newly created patient
* Doctor prescribes medications "opd/prescriptionFlow/prescriptions"
* lab technician uploads patient document and radiology reports

## Should be able to get OPConsultation notes of a patient
Tags: OPConsultation
* Login to Bahmni location "OPD-1" as a receptionist
* Receptionist creates the patient with mobile number <mobileNumber> and starts an Special OPD
* Doctor enrolls Patient onto "HIV Program" stage "programStage" starting "5" years ago with treatment start "2" years ago, id "1234", dr incharge "doctor" and treatment stage "Initial Stage"
* Doctor clicks consultation
* Nurse enters HIV details
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
___
* visit is closed at the front desk
* Verify openmrs Special OPD patient details with mobileNumber <mobileNumber>
