# OPD E2E Tests
## A doctor should be able to record the patient complaints raise tests and prescribe medication
Tags: prescriptions, diagnostics
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Put first name "Automation" middleName "OPD" last name "prescription" gender "M" mobileNumber "9845348122" with yearof birth "2001"
* Put "GAN205238" as patient identifier
* Put healthID "automationopdprescription@sbx"
* Open newly created patient details by healthID
* Start an OPD Visit
* Nurse initiates clinical checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
* visit is closed at the front desk
* Verify openmrs OPD patient details with mobileNumber "9845348122"
* Verify OP Consultation notes

## A doctor should be able to view the approved prescription
* Login to the consent request management system
* Create a consent request for the healthID "automationopdprescription"
|Health Info Types|
|Prescription|
* Login to PHR app
* approve the consent request of "automationopdprescription@sbx" and password "P@ssw0rd"
|Health Info Types|
|Prescription|
* wait for "20000"
* verify the prescription details recieved

## A doctor should be able to view the approved diagnostics
* Login to the consent request management system
* Create a consent request for the healthID "automationopdprescription"
|Health Info Types|
|Diagnostic Reports|
* Login to PHR app
* approve the consent request of "automationopdprescription@sbx" and password "P@ssw0rd"
|Health Info Types|
|DiagnosticReport|
* wait for "20000"
* verify the prescription details recieved
* Logout of HIU

## A doctor should not be able to view the reports when patien revokes the approval
* Login to the consent request management system
* Login to PHR app
* approve the consent request of "automationopddiagnostics@sbx" and password "P@ssw0rd"
|Health Info Types|
|Prescription|
|Diagnostic Reports|
* wait for "20000"
* revoke the consent request of "automationopddiagnostics@sbx" and password "P@ssw0rd"
|Health Info Types|
|Diagnostics|
* Logout of HIU

## A doctor should be able to view the approved OPConsultation
Tags: prescriptions, diagnostics
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Put first name "Automation" middleName "OPD" last name "Diagnostics" gender "F" mobileNumber "9845348122" with yearof birth "1990"
* Put "GAN205238" as patient identifier
* Put healthID "automationopddiagnostics@sbx"
* Open newly created patient details by healthID
* Start an OPD Visit
* Nurse initiates clinical checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
* visit is closed at the front desk
* Verify openmrs OPD patient details with mobileNumber "9845348122"
* Verify OP Consultation notes
* Login to the consent request management system
* Create a consent request for the healthID "automationopdprescription"
|Health Info Types|
|OP Consultation|
* Login to PHR app
* approve the consent request of "automationopddiagnostics@sbx" and password "P@ssw0rd"
|Health Info Types|
|OP Consultation|
* wait for "20000"
* verify the prescription details recieved
* revoke the consent request of "automationopdprescription@sbx" and password "P@ssw0rd"
|Health Info Types|
|OP Consultation|
