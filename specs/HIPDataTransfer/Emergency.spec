# Merge Patient Visits
|mobileNumber|
|+91-9876543210|

## Should be able to get patient lab reports and prescriptions after merge
Tags:prescriptions, diagnostics
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Add this newly created patient as merge patient1
* Start an OPD Visit
* Nurse opens clinical tab
* Nurse enters basic clinical details
* visit is closed at the front desk
* Goto Bahmni home
* Open registration module
* Create a new patient with gender "Female" with random name, aged "27" with mobile number <mobileNumber>
* Add this newly created patient as merge patient2
* Start an IPD Visit
* Doctor issues an Admit disposition
* Goto Bahmni home
* Open "InPatient" module
* Nurse at ADT is able to view bed availability and assign beds
* Goto back from clinical tab
* Doctor clicks consultation
* Nurse enters basic clinical details
* Goto Bahmni home
* Doctor issues an Discharge disposition
* Goto Bahmni home
* Discharge the patient from allocated bed
* Goto the openMRS Admin tab
* Merge the newly created patients
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>

