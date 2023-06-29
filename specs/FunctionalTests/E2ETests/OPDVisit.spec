# OPD E2E Tests

tags: ui

   |mobileNumber |
   |-------------|
   |+919876543210|
* Delete ABHA Address in Bahmni
## A doctor should be able to record the patient complaints raise tests and prescribe medication

tags: prescriptions, diagnostics

* Login to Bahmni location "General Ward" as a receptionist
* Open "Registration" module
* Create a new patient with random details and valid ABHA ID with authentication type as "MOBILE_OTP"
* Start an OPD Visit
* Doctor initiates clinical checkup
* Doctor captures BP, sugar checkup
* Doctor advises medicines "opd/prescriptionFlow/prescriptions" and tests "opd/prescriptionFlow/labTests"
* lab technician uploads patient document and radiology reports
* visit is closed at the front desk
* Verify openmrs OPD patient details with mobileNumber <mobileNumber>
* Verify OP Consultation notes

## A doctor should be able to view the approved prescription
* Login to the consent request management system
* Put healthID "automationopdprescription@sbx"
* Create a consent request for the healthID

   |Health Info Types|
   |-----------------|
   |Prescription     |
* Login to PHR app
* approve the consent request

   |Health Info Types|
   |-----------------|
   |DiagnosticReport |
* wait for "20000"
* Validate the consent Request on HIU for health id

## A doctor should be able to view the approved diagnostics
* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types |
   |------------------|
   |Diagnostic Reports|
* Login to PHR app
* approve the consent request

   |Health Info Types|
   |-----------------|
   |DiagnosticReport |
* wait for "20000"
* Validate the consent Request on HIU for health id
* Logout of HIU

## A doctor should be able to view the approved OPConsultation

tags: OPConsultation

* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types|
   |-----------------|
   |OP Consultation  |
* Login to PHR app
* approve the consent request

   |Health Info Types|
   |-----------------|
   |OPConsultation   |
* wait for "20000"
* reload the consent request page
* Validate the consent Request on HIU for health id

## A doctor should not be able to view the reports when patien denies the approval
* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types|
   |-----------------|
   |OP Consultation  |
* Login to PHR app
* deny the consent request
* wait for "20000"
* Logout of HIU

## A doctor should not be able to view the reports when patien revokes the approval
* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types |
   |------------------|
   |OP Consultation   |
   |Prescription      |
   |Diagnostic Reports|
* Login to PHR app
* approve the consent request

   |Health Info Types|
   |-----------------|
   |Prescription     |
   |DiagnosticReport |
* wait for "20000"
* revoke the consent request

   |Health Info Types|
   |-----------------|
   |DiagnosticReport |
* Logout of HIU

Supported HiTypes are: OPConsultation,DiagnosticReport,Prescription,ImmunizationRecord,DischargeSummary,HealthDocumentRecord,WellnessRecord
