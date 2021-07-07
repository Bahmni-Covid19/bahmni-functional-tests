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
Tags: core-all
* Login to Bahmni location "General Ward" as a receptionist
* Receptionist creates the patient with mobile number <mobileNumber> and starts an OPD
* Nurse initiates clinical checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
* visit is closed at the front desk
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>

## Should be able to get in house lab reports and prescriptions of a patient
* Login to Bahmni location "General Ward" as a receptionist
* Receptionist creates the patient with mobile number <mobileNumber> and starts an OPD
* Nurse initiates clinical checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* Login to Open ELIS
* Collect Sample
* Enter blood Lab results
* Enter serum Lab results
* Find the patient
* Validate lab result details in samples collected
* Goto Bahmni home
* visit is closed at the front desk
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
