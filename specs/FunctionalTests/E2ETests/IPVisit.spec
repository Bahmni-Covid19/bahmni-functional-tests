# IPD Visits E2E Tests

tags: ui

   |mobileNumber |
   |-------------|
   |+919876543210|
## Should be able to get patient lab reports

tags: prescriptions, diagnostics

* Delete ABHA Address in Bahmni
* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create a new patient with random details and valid ABHA ID with authentication type as "MOBILE_OTP"
* Start an IPD Visit
* Doctor issues an Admit disposition
* Goto Clinical application
* Admit a patient to general ward bed "304-d"
* Goto Clinical application
* Doctor opens clinical tab
* Doctor enters basic clinical details
* Doctor prescribes tests "opd/prescriptionFlow/labTests"
* Doctor prescribes medications "opd/prescriptionFlow/prescriptions"
* Doctor issues an Discharge disposition
* Login to Open ELIS
* Collect Sample
* Enter blood Lab results
* Enter serum Lab results
* Validate lab result "details" in samples collected
* Goto Clinical application
* Open "Patient Documents" module
* Choose newly created patient
* Add a report "labReport1" to "Patient Documents"
* Goto Clinical application
* Open "InPatient" module
* Doctor at ADT gives discharge disposition
* visit is closed at the front desk
* Verify openmrs IPD patient details with mobileNumber <mobileNumber>
* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types|
   |-----------------|
   |Prescription     |
   |Discharge Summary|
* Login to PHR app
* approve the consent request

   |Health Info Types|
   |-----------------|
   |Prescription     |
   |Discharge Summary|
* wait for "20000"

