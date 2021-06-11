# HealthID
|mobileNumber|
|+91-9876543210|
## Verify health ID
* Login to Bahmni as a receptionist
* Create a new patient with random name and healthID mobileNumber <mobileNumber>
* Click on home page and goto registration module
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
