# HealthID Mapping with existing patients Fuzzy Logic
Tags:HIPInitiatedLinking

|mobileNumber|
|+91-9876543210|
## Should be able to map NDHM Records based on fuzzy logic
* Put first name "Soumya" middleName "" last name "Gupta" gender "F" mobileNumber <mobileNumber> age "30"
* Verify match with NDHM record with age less than 2 years
* Verify match with NDHM record with age more than 2 years
* Verify match with NDHM record with with different mobile number "1234567890"
* Verify match with NDHM record with one letter changed in firstName "Sowmya"
* Verify match with NDHM record with one letter missing in firstName "Somya"
* Verify match with NDHM record with one letter more in firstName "Sowmya" lastName "Guptha"
* Verify match with NDHM record with one firstName "Sowmya" middleName "Swaroopa" lastName "Guptha"
* Verify match with NDHM record with one firstName "Somya" middleName "" lastName "G"

## Should display NDHM Records and Bahmni Records based on fuzzy logic
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient, if patient does not exist with firstName "Soumya" middleName "Swaroop" lastName "Gupta", gender "F" mobileNumber <mobileNumber> age "30"
* Should fetch record with firstName "Somya" middleName "" lastName "G" gender "F" age "32" and mobileNumber "1234567890"
* Should display Bahmni record with firstName "Soumya" lastName "Gupta" gender "F" age "30" with mobile number <mobileNumber> 
* Should display NDHM record with firstName "Somya" middleName "" lastName "G" gender "F" age "32" with mobile number <mobileNumber>
## Should be able to map NDHM Records based on fuzzy logic Known Issues
* knownIssue
* Put first name "Soumya" middleName "" last name "Gupta" gender "F" mobileNumber <mobileNumber> age "30"
* Verify match with NDHM record with one firstName "Sowmya" middleName "SomethingElse" lastName "Guptha"
* Verify match with NDHM record with only firstName "Sowmya"

## Should be able to map NDHM Record with name spelling, date of birth and mobile number mismatch
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient, if patient does not exist with firstName "Soumya" middleName "Swaroop" lastName "Gupta", gender "F" mobileNumber <mobileNumber> age "30"
* Should fetch record with firstName "Sowmya" middleName "" lastName "G" gender "F" age "28" and mobileNumber "1234567890"
* Should display Bahmni record with firstName "Soumya" lastName "Gupta" gender "F" age "30" with mobile number <mobileNumber>
* Should display NDHM record with firstName "Sowmya" middleName "" lastName "G" gender "F" age "28" with mobile number "1234567890"

## Should be able to map NDHM Record with first name fuzzy match
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient, if patient does not exist with firstName "Soumya" middleName "Swaroop" lastName "Gupta", gender "F" mobileNumber <mobileNumber> age "30"
* Should fetch record with firstName "Somya" middleName "" lastName "Guptha" gender "F" age "28" and mobileNumber "1234567890"
* Should display Bahmni record with firstName "Soumya" lastName "Gupta" gender "F" age "30" with mobile number <mobileNumber>
* Should display NDHM record with firstName "Somya" middleName "" lastName "Guptha" gender "F" age "28" with mobile number "1234567890"
