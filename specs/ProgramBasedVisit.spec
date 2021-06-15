# Program Based Visits
|mobileNumber|
|+91-9876543210|
## Should be able to enter program level details for a patient
* Login to Bahmni location "OPD-1" as a receptionist
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
* Goto Bahmni home
* Open Patient Documents
* Choose newly created patient
* Add a lab report "labReport1"
* Go back to home page
___
* Close the visit
* Verify openmrs Special OPD patient details with mobileNumber <mobileNumber>
