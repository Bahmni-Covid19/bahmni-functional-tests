const axios = require('axios')

step("Verify openmrs prescriptions for OPD from <fromDate> to <toDate>", async function (fromDate, toDate) {
    var patientId = ""
    var visitType = 'OPD'
    var fromDate = ""
    var toDate = ""
    var patientGender = "F"
    var patientName = "First Last"
    var phoneNumber = "+91-9876543210"
    var patientYearOfBirth = ""
    var existingPatients = properties.env.bahmniHost + "/" + properties.env.existingPatients
    var uuid = axios.get()
    var visitPrescriptions = properties.env.bahmniHost + "/" + properties.env.visitPrescriptions
    axios.get()

});


step("Verify openmrs prescriptions", async function () {
    var existingPatients = "https://ndhm-dev.bahmni-covid19.in/openmrs/ws/rest/v1/hip/existingPatients?patientName=First Last&patientYearOfBirth=2000&patientGender=F&phoneNumber=+91-9876543210"
    var prescriptionsVisit = "https://ndhm-dev.bahmni-covid19.in/openmrs/ws/rest/v1/hip/prescriptions/visit?patientId=fcd4c49a-b4b3-41c1-b5a0-74ef005b6cb2&visitType=OPD&fromDate=2020-01-01&toDate=2021-12-12"
    
    var uuid = axios.get(prescriptionsVisit
        , {
            headers: {
                'Authorization': `token ${process.env.receptionist}`
            }
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });

});