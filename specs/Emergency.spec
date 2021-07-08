# Merge Patient Visits
|mobileNumber|
|+91-9876543210|

## Should be able to get patient lab reports and prescriptions after merge
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Add this newly created patient as merge patient1
* Open newly created patient details by search
* OPD Visit is started at the front desk
* Nurse opens clinical tab
* Enter History and examination details
* Click Save
* Enter vitals
* visit is closed at the front desk
* Goto Bahmni home
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Add this newly created patient as merge patient2
* Click on home page and goto registration module
* Open newly created patient details by search
* IPD Visit is started at the front desk
* Doctor issues an Admit disposition
* Goto Bahmni home
* Open In Patient module
* Nurse at ADT is able to view bed availability and assign beds
* Goto home from clinical tab
* Doctor clicks consultation
* Enter History and examination details
* Click Save
* Enter vitals
* Goto Bahmni home
* Doctor issues an Discharge disposition
* Goto Bahmni home
* Open In Patient module
* Nurse at ADT is able to give discharge disposition
* Goto the openMRS Admin tab
* Merge the newly created patients
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>
