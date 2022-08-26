# Register patient using ABHA

tags: clinic, abdm

   |mobileNumber  |
   |--------------|
   |+919876543210|

## Should be able to register a new patient with ABHA address and proceed with logging clinical details

tags: clinic, abdm, registration

* Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* Open "Registration" module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
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
* Receptionist creates the patient with mobile number <mobileNumber> without village
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
