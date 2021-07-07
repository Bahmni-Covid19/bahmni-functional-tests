# IPD Visits
|mobileNumber|
|+91-9876543210|
## Should be able to get patient lab reports
Tags: core-all
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Open newly created patient details by search
* Start an IPD Visit
* Doctor issues an Admit disposition
* Goto Bahmni home
* Open In Patient module
* Nurse at ADT is able to view bed availability and assign beds
* Goto clinical tab
* Doctor clicks consultation
* Enter History and examination details
* Click Save
* Enter vitals
* Doctor must be able to prescribe tests "opd/prescriptionFlow/labTests"
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Click Save
* Goto Bahmni home
* Open Patient Documents
* Choose newly created patient
* Add a report "labReport1" to "Patient Documents"
* Click on home page
* Doctor issues an Discharge disposition
* Goto Bahmni home
* Open In Patient module
* Nurse at ADT is able to give discharge disposition
___
* visit is closed at the front desk
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>
