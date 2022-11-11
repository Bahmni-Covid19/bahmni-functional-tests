# Register patient using ABHA

tags: clinic, abdm
## Should be able to register a new patient with ABHA address and proceed with logging clinical details

tags: clinic, abdm, registration, regression

* Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* Open "Registration" module
* Create a new patient with random details and random ABHA ID
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start a "OPD" Visit
* Logout and Login to Bahmni location "Bahmni Clinic" as a "doctor"
* Doctor initiates clinical checkup with healthID
* Click back button
* Click back button
* Logout and Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* visit is closed at the front desk

## Should be able to map the existing patient with ABHA address and proceed with logging clinical details

tags: clinic, abdm, registration, regression

* Login to Bahmni location "Bahmni Clinic" as a receptionist
* Receptionist creates the patient
* Map the health ID with the Existing patient
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start a "OPD" Visit
* Logout and Login to Bahmni location "Bahmni Clinic" as a "doctor"
* Doctor initiates clinical checkup with healthID
* Click back button
* Click back button
* Logout and Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* visit is closed at the front desk

## Receptionist should be able to register the patient from patient queue.

tags: clinic, abdm, registration, regression

* Delete ABHA Address in Bahmni
* Login to PHR app
* Patients scans the facility QR and receives the token number
* Login to Bahmni location "Bahmni Clinic" as a receptionist
* Register the patient using patient queue
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open
* Start a "OPD" Visit
* Logout and Login to Bahmni location "Bahmni Clinic" as a "doctor"
* Doctor initiates clinical checkup with healthID
* Click back button
* Click back button
* Logout and Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* visit is closed at the front desk
* Delete ABHA Address in Bahmni