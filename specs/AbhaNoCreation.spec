# Abha No creation E2E Tests

## Should be able to create Abha Number and Abha Address

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create Abha No for a Patient
* Create Abha address for a patient
* Verify ABDM record displayed
* Verify patient details on registration page
* Save the patient data
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start an OPD Visit
* Logout and Login to Bahmni location "Bahmni Clinic" as a "doctor"
* Doctor initiates clinical checkup with healthID
* Click back button
* Click back button
* Logout and Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* visit is closed at the front desk


