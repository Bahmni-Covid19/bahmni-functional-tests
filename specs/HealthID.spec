# HealthID

## Verify health ID
* Login to Bahmni as a receptionist
* Create a new patient with health id "somethingSSS@sbx" with mobile number "+91-9876543210"
* Open newly created patient details by search
* Start an OPD
* Doctor opens the consultation notes "Consultation Notes" for newly created patient "First" "Last"
* Doctor must be able to prescribe tests
|TestName|
|Haemogram|
|Serum|
|Liver Function - General|
|LDH|
* Close the visit
* Goto Bahmni home
* Open Patient Documents
* Choose patient "First" "Last"
* Add a lab report "labReport1"
* Verify openmrs prescriptions for OPD from "yesterday" to "today"
* Create a consent request for the healthID "somethingSSS@sbx"
|Health Info Types|
|Prescription|

## Get UUID
* Login to Bahmni as a receptionist
* Verify openmrs prescriptions
## Consent Request
* Create a consent request for the healthID "somethingSSS@sbx"
|Health Info Types|
|Prescription|