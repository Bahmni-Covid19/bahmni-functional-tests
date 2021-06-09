# HealthID
|patientFirstName|patientLastName|patientHealthID|mobileNumber|
|Something|M|somethingM@sbx|+91-9876543210|
## Verify health ID
* Login to Bahmni as a receptionist
* Create a new patient with health id <patientHealthID> with firstName <patientFirstName> lastName <patientLastName> mobileNumber <mobileNumber>
* Open newly created patient details by search
* Start an OPD
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
## Login
* Login to Bahmni as a receptionist
