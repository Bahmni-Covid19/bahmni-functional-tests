# OPD Visits
|mobileNumber|
|+91-9876543210|

## Should be able to search with healthID once associated
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open

## Should be able to get patient external lab reports and prescriptions
Tags: core
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Open newly created patient details by search
* Start an OPD Visit
* Doctor begins consultation
* Enter History and examination details
* Enter vitals
* Doctor opens the consultation notes "Consultation Notes" for newly created patient
* Doctor must be able to prescribe tests "opd/prescriptionFlow/labTests"
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Upload a report "labReport1" to Patient Documents
* Upload a report "labReport2" to Radiology
* Close the visit
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>

## Should be able to get in house lab reports and prescriptions of a patient
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Open newly created patient details by search
* Start an OPD Visit
* Doctor begins consultation
* Enter History and examination details
* Enter vitals
* Doctor opens the consultation notes "Consultation Notes" for newly created patient
* Doctor must be able to prescribe tests "opd/prescriptionFlow/labTests"
* Doctor starts prescribing medications "opd/prescriptionFlow/prescriptions"
* Login to Open ELIS
* Collect Sample
* Enter Lab results
* Close the visit
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
