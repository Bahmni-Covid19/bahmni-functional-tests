# Fetching Patient Details
|mobileNumber|
|+91-9876543210|

## Verify health ID
* Login to Bahmni location "General Ward" as a receptionist
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Open newly created patient details by search
* Start an OPD Visit
* Doctor opens the consultation notes "Consultation Notes" for newly created patient
* Doctor must be able to prescribe tests
|TestName|
|Haemogram|
|Serum|
|Liver Function - General|
|LDH|
* Goto Bahmni home
* Open Patient Documents
* Choose newly created patient
* Add a lab report "labReport1"
* Close the visit
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
## Should be able to get patient lab reports
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Open newly created patient details by search
* Start an OPD Visit
* Doctor opens the consultation notes "Consultation Notes" for newly created patient
* Doctor must be able to prescribe tests
|TestName|
|Haemogram|
|Serum|
|Liver Function - General|
|LDH|
* Goto Bahmni home
* Open Patient Documents
* Choose newly created patient
* Add a lab report "labReport1"
* Close the visit
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>

## Should be able to get patient prescription
* Login to Bahmni location "General Ward" as a receptionist
* Open registration module
* Create a new patient with gender "Female" with random name, aged "29" with mobile number <mobileNumber>
* Open newly created patient details by search
* Start an OPD Visit
* Doctor opens the consultation notes "Consultation Notes" for newly created patient
* Doctor must be able to prescribe tests
|TestName|
|Haemogram|
|Serum|
|Liver Function - General|
|LDH|
* Doctor starts prescribing medications
* Doctor prescribes drug "Paracetamol 500mg (Tablet)" at a frequency "Thrice a day"
* Doctor prescribes drug dosage "3" for a duration "7".
* Close the visit