# Program Based Visit E2E Tests
## Should be able to enter program level details for a patient

tags: prescriptions, diagnostics

* Login to Bahmni location "OPD-1" as a receptionist
* Open "Registration" module
* Create a new patient with random name, health ID and mobileNumber "+919876543210"
* Start an Special OPD Visit
* Doctor opens Patient "HIV Program" dashboard
* Doctor clicks consultation
* Doctor enters basic clinical details
* Doctor captures BP, sugar checkup
* Doctor captures the consultation notes "Consultation Notes" for newly created patient
* Doctor prescribes medications "opd/prescriptionFlow/prescriptions"
* Login to Open ELIS
* Collect Sample
* Enter blood Lab results
* Enter serum Lab results
* Validate lab result "details" in samples collected
* Goto Clinical application
* visit is closed at the front desk
* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types |
   |------------------|
   |Prescription      |
   |Diagnostic Reports|
* Login to PHR app
* approve the consent request

   |Health Info Types|
   |-----------------|
   |Prescription     |
   |Discharge Summary|



