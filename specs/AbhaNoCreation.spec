# ABHA No & ABHA Address creation E2E Tests

## Should be able to create Abha Number and Abha Address

tags: clinic, abdm, registration, regression

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Click create new patient
* Generate random patient data
* Fetch aadhaar details
* Click on Confirm to verify Aadhaar otp
* Verify Aadhaar details
* Click on Proceed
* Create Abha No for a Patient
* Create Abha address for a patient
* Verify ABDM record displayed
* Click on Create New Record button
* Verify details on Registration page
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

## Should be able to link Abha Address for newly created Abha Number

tags: clinic, abdm, registration, regression

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Click create new patient
* Generate random patient data
* Fetch aadhaar details
* Click on Confirm to verify Aadhaar otp for existing Abha Number
* Verify Aadhaar details with ABHA Number
* Click on Proceed
* Link abha address for a patient
* Verify ABDM record displayed
* Click on Create New Record button
* Verify details on Registration page
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

## Should be able to link Abha Address for newly created Abha Number with Matching record Found

tags: clinic, abdm, registration, regression

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create a new patient with random details and random ABHA ID
* Fetch aadhaar details
* Click on Confirm to verify Aadhaar otp for existing Abha Number
* Verify Aadhaar details with ABHA Number
* Click on Proceed
* Link abha address for a patient with matching record found
* Choose the bahmni record which needs to be updated
* Verify details on Registration page
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

## Should be able to create Abha Address for existing Abha Number not registered in Bahmni

tags: clinic, abdm, registration, regression

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Click create new patient
* Generate random patient data
* Fetch aadhaar details
* Click on Confirm to verify Aadhaar otp for existing Abha Number
* Verify Aadhaar details with ABHA Number
* Click on Proceed
* Create Abha address for a patient
* Verify ABDM record displayed
* Click on Create New Record button
* Verify details on Registration page
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

## Should be able to proceed with the existing abha address linked to abha number

tags: clinic, abdm, registration, regression

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Click create new patient
* Generate random patient data
* Fetch aadhaar details
* Click on Confirm to verify Aadhaar otp for existing Abha Number and Abha Address
* Verify Aadhaar details with ABHA Number and ABHA Adress
* Click on Proceed
* Choose from existing abha address linked to abha number
* Verify details on Registration page
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

