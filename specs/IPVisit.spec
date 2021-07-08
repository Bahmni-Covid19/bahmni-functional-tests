# IPD Visits
|mobileNumber|
|+91-9876543210|
## Should be able to get patient lab reports
Tags: core
* Login to Bahmni location "General Ward" as a receptionist
* Receptionist creates the patient with mobile number <mobileNumber> and starts an IPD
* Doctor issues an Admit disposition
* Nurse assigns bed to patient
* Goto home from clinical tab
* Nurse initiates clinical checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
* Click on home page
* Doctor issues an Discharge disposition
* Nurse discharges the patient from the allocated bed
___
* visit is closed at the front desk
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>
