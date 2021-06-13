# Program Based Visits
|mobileNumber|
|+91-9876543210|
## Should be able to enter program level details for a patient
* Login to Bahmni location "OPD-1" as a receptionist
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by search
* Start an Special OPD Visit
* Open Programs module
* Goto All sections and search the newly created patient
* Enroll in program "HIV Program" stage "programStage" starting "5" years ago with treatment start "2" years ago, id "1234", dr incharge "doctor" and treatment stage "Initial Stage"
* Open the program dashboard "HIV Program Dashboard"
* Doctor begins consultation
* Enter History and examination details
* Enter vitals
___
* Close the visit
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
