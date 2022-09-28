# End to End test for HIU Flow

tags: clinic, abdm

   |mobileNumber |
   |-------------|
   |+919876543210|

## User should be able to register patient with ABHA address, log clinical details, create consent request, approve consent request and view details in HIU.

tags: clinic, abdm, hiu, phr, regression

* Delete ABHA Address in Bahmni
* Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* Open "Registration" module
* Create a new patient with random name, health ID and mobileNumber <mobileNumber>
* Start a "OPD" Visit
* Logout and Login to Bahmni location "Bahmni Clinic" as a "doctor"
* Doctor initiates clinical checkup with healthID
* Doctor notes the diagnosis and condition "consultation/diagnosis/diagnosis_condition"
* Doctor captures the consultation notes "Consultation Notes" for newly created patient
* Doctor advises medicines "consultation/medications/paracetamol" and tests "consultation/orders/Haemogram"
* Click back button
* Click back button
* Open "Lab entry" module
* Open a patient in lablite
* Upload and verify report in lablite
* Click Home button on lab-lite
* Logout and Login to Bahmni location "Bahmni Clinic" as a "receptionist"
* visit is closed at the front desk
* Click back button
* Login to the consent request management system
* Create a consent request for the healthID

   |Health Info Types     |
   |----------------------|
   |OP Consultation       |
   |Diagnostic Report     |
   |Prescription          |
   |Immunization Record   |
   |Discharge Summary     |
   |Health Document Record|
   |Wellness Record       |

* Login to PHR app
* Link the care context with user
* approve the consent request

   |Health Info Types   |
   |--------------------|
   |OPConsultation      |
   |DiagnosticReport    |
   |Prescription        |
   |ImmunizationRecord  |
   |DischargeSummary    |
   |HealthDocumentRecord|
   |WellnessRecord      |
* wait for "5000"
* Validate the consent Request on HIU for health id
* Logout of HIU
* Delete ABHA Address in Bahmni