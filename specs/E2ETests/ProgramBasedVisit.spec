# Program Based Visit E2E Tests
## Should be able to enter program level details for a patient
Tags: prescriptions, diagnostics
* Login to Bahmni location "OPD-1" as a receptionist
* Put first name "Automation" middleName "OPD" last name "prescription" gender "M" mobileNumber "9845348122" with yearof birth "2001"
* Put "GAN205238" as patient identifier
* Put healthID "automationopdprescription@sbx"
* Open registration module
* Open newly created patient details by healthID
* Start an Special OPD Visit
* Doctor opens Patient "HIV Program" dashboard
* Doctor clicks consultation
* Nurse enters basic clinical details
* Nurse captures BP, sugar checkup
* Doctor captures the consultation notes "Consultation Notes" for newly created patient
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Login to Open ELIS
* Collect Sample
* Enter blood Lab results
* Enter serum Lab results
* Validate lab result "details" in samples collected
* Goto Bahmni home
* visit is closed at the front desk
* Login to the consent request management system
* Create a consent request for the healthID "automationopdprescription"
|Health Info Types|
|Prescription|
|Diagnostic Reports|
* Login to PHR app
* approve the consent request of "automationopdprescription@sbx" and password "P@ssw0rd"


