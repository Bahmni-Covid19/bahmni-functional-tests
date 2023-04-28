# HealthID Mapping with new patients Fuzzy Logic
Tags:HIPInitiatedLinking

|mobileNumber|
|+91-9876543210|

## Should display NDHM Record details when no mapping found
* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Click create new patient
* Should fetch record with firstName "New" middleName "Patient" lastName "Record" gender "U" age "32" and mobileNumber "1234567890"
* Create new record
* Should verify details of newly created record from NDHM - firstName "New" middleName "Patient" lastName "Record" gender "U" age "32" with mobile number "1234567890"