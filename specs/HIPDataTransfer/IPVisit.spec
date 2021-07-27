# IPD Visits
|mobileNumber|
|+91-9876543210|
## Should be able to get patient lab reports
Tags: prescriptions, diagnostics
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Start an IPD Visit
* Doctor issues an Admit disposition
* Goto Bahmni home
* Open "InPatient" module
* Nurse at ADT is able to view bed availability and assign beds
* Goto back from clinical tab
* Doctor clicks consultation
* Nurse enters basic clinical details
* Doctor starts ordering tests "opd/prescriptionFlow/labTests"
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Goto Bahmni home
* Open "Patient Documents" module
* Choose newly created patient
* Add a report "labReport1" to "Patient Documents"
* Click on home page
* Doctor issues an Discharge disposition
* Goto Bahmni home
* Open "InPatient" module
* Nurse at ADT gives discharge disposition
___
* visit is closed at the front desk
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>
