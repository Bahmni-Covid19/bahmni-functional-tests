# OPD E2E Tests
|mobileNumber|
|9876543210|

## Should be able to get prescriptions
Tags: prescriptions, diagnostics
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Put first name "Automation" middleName "OPD" last name "prescription" gender "M" mobileNumber "9845348122" age "20"
* Put "GAN205238" as patient identifier
* Put healthID "automationopdprescription@sbx"
* Open newly created patient details by healthID
* Start an OPD Visit
* Nurse initiates clinical checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
* visit is closed at the front desk
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
* Login to the consent request management system
* Create a consent request for the healthID "automationopdprescription"
|Health Info Types|
|Prescription|
* Login to PHR app
* approve the consent request of "automationopdprescription@sbx" and password "P@ssw0rd"
