# HealthID as identifier
Tags:HIPInitiatedLinking

|mobileNumber|
|+91-9876543210|

## Should be able to search with healthID in registration module
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open

## Should be able to search with healthID in clinical module
* knownIssue
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start an OPD Visit
* Nurse initiates clinical checkup with healthID

## Should be able to search with healthID in program module
* knownIssue
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start an Special OPD Visit
* Open "Programs" module
* Goto All sections
* Search the newly created patient with HealthID
