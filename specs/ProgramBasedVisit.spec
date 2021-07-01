# Program Based Visits
|mobileNumber|
|+91-9876543210|
## Should be able to enter program level details for a patient
Tags: core
* Login to Bahmni location "OPD-1" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by search
* Start an Special OPD Visit
* Open Programs module
* Goto All sections and search the newly created patient
* Enroll in program "HIV Program" stage "programStage" starting "5" years ago with treatment start "2" years ago, id "1234", dr incharge "doctor" and treatment stage "Initial Stage"
* Open the program dashboard "HIV Program Dashboard"
* Doctor clicks consultation
* Enter History and examination details
* Click Save
* Enter vitals
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Click Save
* lab technician uploads patient document and radiology reports
___
* visit is closed at the front desk
* Verify openmrs Special OPD patient details with mobileNumber <mobileNumber>
