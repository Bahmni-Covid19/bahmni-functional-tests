# HealthID as identifier

tags: HIPInitiatedLinking

## Should be able to search with healthID in registration module
* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create a new patient with random details and random ABHA ID with authentication type "MOBILE_OTP"
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open

## Should be able to search with healthID in clinical module
* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create a new patient with random details and random ABHA ID with authentication type "MOBILE_OTP"
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start a "OPD" Visit
* Doctor initiates clinical checkup with healthID

## Should be able to search with healthID in program module
knownIssue
* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create a new patient with random details and random ABHA ID with authentication type "MOBILE_OTP"
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start an Special OPD Visit
* Open "Programs" module
* Goto All sections
* Search the newly created patient with HealthID
