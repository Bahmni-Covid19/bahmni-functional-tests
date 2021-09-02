# IPD Visits E2E Tests
|mobileNumber|
|9845348122|
## Should be able to get patient lab reports
Tags: prescriptions, diagnostics
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Put first name "Automation" middleName "OPD" last name "prescription" gender "M" mobileNumber <mobileNumber> age "20"
* Put "GAN205238" as patient identifier
* Put healthID "automationopdprescription@sbx"
* Open newly created patient details by healthID
* Start an IPD Visit
* Doctor issues an Admit disposition
* Goto Bahmni home
* Admit a patient to general ward bed "304-d"
* Goto Bahmni home
* Nurse opens clinical tab
* Nurse enters basic clinical details
* Doctor starts ordering tests "opd/prescriptionFlow/labTests"
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Doctor issues an Discharge disposition
* Login to Open ELIS
* Collect Sample
* Enter blood Lab results
* Enter serum Lab results
* Validate lab result "details" in samples collected
* Goto Bahmni home
* Open "Patient Documents" module
* Choose newly created patient
* Add a report "labReport1" to "Patient Documents"
* Goto Bahmni home
* Open "InPatient" module
* Nurse at ADT gives discharge disposition
* visit is closed at the front desk
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>
* Login to the consent request management system
* Create a consent request for the healthID "automationopdprescription"
|Health Info Types|
|Prescription|
* Login to PHR app
* approve the consent request of "automationopdprescription@sbx" and password "P@ssw0rd"

