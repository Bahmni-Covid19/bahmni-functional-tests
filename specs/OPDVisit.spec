# OPD Visits
|mobileNumber|
|+91-9876543210|

## Verify health ID
* Login to Bahmni location "General Ward" as a receptionist
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by search
## Should be able to get patient lab reports and prescriptions
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
* Goto Bahmni home
* Open Patient Documents
* Choose newly created patient
* Add a lab report "labReport1"
* Close the visit
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>