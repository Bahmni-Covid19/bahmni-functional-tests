# HealthID
|mobileNumber|
|+91-9876543210|

## Should be able to search with healthID once associated
Tags: ndhm
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
* Open newly created patient details by healthID
* Verify correct patient form is open

## Should not allow to associate HeatlhID if already linked
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient, if patient does not exist with firstName "Soumya" middleName "Swaroop" lastName "Gupta", gender "F" mobileNumber <mobileNumber> age "30"
* Open newly created patient details by search
* Associate patient with healthID mobileNumber <mobileNumber>
* Should not allow to associate HeatlhID if already linked

## Should match NDHM record with no last name with Bahmni record with Full Name details
* Create a new patient with gender "F" with name "Soumya" "Swaroop" "Gupta", aged "30" with mobile number <mobileNumber>
* Should fetch record with similar details