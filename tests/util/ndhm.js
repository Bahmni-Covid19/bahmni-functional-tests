"use strict";

const {
    intercept
} = require('taiko');
const axios = require('axios')
var fileExtension = require("../../bahmni-e2e-common-flows/tests/util/fileExtension");
const uuid = require('uuid')
const { faker } = require('@faker-js/faker/locale/en_IND');

async function interceptFetchModes(token) {
    //https://mixedanalytics.com/knowledge-base/api-connector-encode-credentials-to-base-64/
    var body1 = {
        "authModes": [
            "MOBILE_OTP",
            "AADHAAR_OTP"
        ]
    };
    var reqBodyOnFetchModes = JSON.stringify(body1);
    var response = {
        method: 'POST',
        port: '9052',
        hostname: process.env.bahmniHost,
        path: '/v0.5/users/auth/on-fetch-modes',
        body: body1,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'content-length': reqBodyOnFetchModes.length,
            'X-HIP-ID': '10000005'
        }
    }

    await intercept(process.env.bahmniHost + "/ndhm/null/v0.5/hip/fetch-modes", response, 1)
    await intercept(process.env.bahmniHost + "/hiprovider/v0.5/hip/fetch-modes", response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + "/hiprovider/v0.5/hip/fetch-modes")
}

async function interceptAuthInit(token) {
    var reqBodyOnFetchModes = JSON.stringify("");
    var response = {
        method: 'POST',
        port: '9052',
        hostname: process.env.bahmniHost,
        path: '/v0.5/users/auth/on-init',
        body: {},
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'content-length': reqBodyOnFetchModes.length,
            'X-HIP-ID': '10000005'
        }
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v0.5/hip/auth/init", response, 1)
    await intercept(process.env.bahmniHost + "/ndhm/null/v0.5/hip/auth/init", response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + "/hiprovider/v0.5/hip/auth/init")

}

async function redirectExistingPatients(token, firstName, lastName, yearOfBirth, gender, mobileNumber) {
    var fullName = (lastName == "") ? firstName : firstName + "+" + lastName

    var newURL = process.env.bahmniHost + process.env.openMRSRestAPIPrefix + "/existingPatients?patientName=" + fullName
        + "&patientYearOfBirth=" + yearOfBirth + "&patientGender=" + gender + "&phoneNumber=%2B" + mobileNumber;
    console.log(newURL)

    var data = JSON.stringify((await axios.get(newURL, {
        headers: {
            'Authorization': `token ${process.env.receptionist}`
        }
    })).data)
    var response = {
        method: 'POST',
        port: '9052',
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'content-length': data.length
        }
    }

    var properExistingPatientUrl = process.env.bahmniHost + "/ndhm/null/existingPatients?patientName=" + fullName
        + "&patientYearOfBirth=" + yearOfBirth + "&patientGender=" + gender + "&phoneNumber=%2B" + (mobileNumber.split('+')[1] == null) ? mobileNumber : mobileNumber.split('+')[1];

    await intercept(properExistingPatientUrl, response, 1);
}

async function interceptAuthConfirm(token, healthID, firstName, lastName, yearOfBirth, gender, patientMobileNumber) {
    var confirm = fileExtension.parseContent("./data/confirm/simple.txt")
        .replace('<healthID>', healthID)
        .replace('<fullName>', firstName + " " + lastName)
        .replace('<gender>', gender)
        .replace('<yearOfBirth>', yearOfBirth)
        .replace('<monthOfBirth>', faker.datatype.number({ min: 1, max: 12 }))
        .replace('<dayOfBirth>', faker.datatype.number({ min: 1, max: 28 }))
        .replace('<district>', faker.address.city())
        .replace('<state>', faker.address.state())
        .replace('<mobileNumber>', patientMobileNumber);
    var response = {
        method: 'POST',
        port: '9052',
        hostname: process.env.bahmniHost,
        path: '/v0.5/users/auth/on-init',
        body: confirm,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'content-length': confirm.length,
            'X-HIP-ID': '10000005'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v0.5/hip/auth/confirm", response, 1);
    await intercept(process.env.bahmniHost + "/ndhm/null/v0.5/hip/auth/confirm", response, 1);
    gauge.message("intercepted" + process.env.bahmniHost + "/hiprovider/v0.5/hip/auth/confirm")
}

async function interceptExistingPatients(token, healthID) {
    var body1 = {
        "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
    };
    var reqBodyOnFetchModes = JSON.stringify(body1);
    var response = {
        method: 'POST',
        port: '9052',
        body: body1,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'content-length': reqBodyOnFetchModes.length
        }
    }
    await intercept(process.env.bahmniHost + process.env.openMRSRestAPIPrefix + "/existingPatients/" + healthID, response, 1)
    await intercept(process.env.bahmniHost + "/ndhm/null/existingPatients/" + healthID, response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + process.env.openMRSRestAPIPrefix + "/existingPatients/" + healthID)
}

async function interceptExistingPatientsWithParams(token, firstName, lastName, yearOfBirth, gender) {
    var fullName = (lastName == "") ? firstName : firstName + " " + lastName
    var existingPatientUrl = process.env.bahmniHost + "/ndhm/null/existingPatients/?patientName=" + fullName
        + "&patientYearOfBirth=" + yearOfBirth + "&patientGender=" + gender;

    var properExistingPatientUrl = process.env.bahmniHost + process.env.openMRSRestAPIPrefix + "/existingPatients?patientName=" + fullName
        + "&patientYearOfBirth=" + yearOfBirth + "&patientGender=" + gender;

    var body1 = {
        "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
    };
    var reqBodyOnFetchModes = JSON.stringify(body1);
    var response = {
        method: 'GET',
        port: '9052',
        body: body1,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'content-length': reqBodyOnFetchModes.length
        }
    }

    await intercept(existingPatientUrl, (request) => response, 1);
    await intercept(properExistingPatientUrl, (request) => response, 1);
}

async function deleteAbhaAddress(abhaAddress) {

    var data = await axios.post(process.env.bahmniHost + '/hiprovider/v0.5/patients/status/notify', {
        "requestId": uuid.v4(),
        "timestamp": new Date().toISOString(),
        "notification": {
            "status": "DELETED",
            "patient": {
                "id": abhaAddress
            }
        },
        headers: {
            'accept': `application/json`,
            'Content-Type': `application/json`,
            'Authorization': 'Basic ' + process.env.doctor
        }
    });
    return data;
}

async function interceptAadhaarGenerateOtp() {
    var generateOtpBody = {
        "mobileNumber": "******3210"
    };
    var strGenerateOtpBody = JSON.stringify(generateOtpBody);
    var response = {
        method: 'POST',
        body: generateOtpBody,
        headers: {
            'Content-Type': 'application/json',
            'content-length': strGenerateOtpBody.length

        }
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/generateOtp", response, 1)
}
async function replacePopulateAadharDetails(strBody) {
    return strBody.replace('<txnId>', uuid.v4())
        .replace('<profilePhoto>', gauge.dataStore.scenarioStore.get("profilePhotoB64"))
        .replace('<fullName>', gauge.dataStore.scenarioStore.get("patientFirstName") + " " + gauge.dataStore.scenarioStore.get("patientMiddleName") + " " + gauge.dataStore.scenarioStore.get("patientLastName"))
        .replace('<gender>', gauge.dataStore.scenarioStore.get("patientGender").charAt(0))
        .replace('<dateOfBirth>', gauge.dataStore.scenarioStore.get("dayOfBirth") + "-" + gauge.dataStore.scenarioStore.get("monthOfBirth") + "-" + gauge.dataStore.scenarioStore.get("yearOfBirth"))
        .replace('<fatherName>', gauge.dataStore.scenarioStore.get("fatherName"))
        .replace('<houseNo>', gauge.dataStore.scenarioStore.get("buildingNumber"))
        .replace('<streetNo>', gauge.dataStore.scenarioStore.get("street"))
        .replace('<locality>', gauge.dataStore.scenarioStore.get("locality"))
        .replace('<city>', gauge.dataStore.scenarioStore.get("city"))
        .replace('<district>', gauge.dataStore.scenarioStore.get("city"))
        .replace('<state>', gauge.dataStore.scenarioStore.get("state"))
        .replace('<pincode>', gauge.dataStore.scenarioStore.get("pincode"))
        .replace("<healthIdNumber>", gauge.dataStore.scenarioStore.get("abhaNumber"))
        .replace("<healthId>", gauge.dataStore.scenarioStore.get("healthID"))
        .replace("<phrAddress>", gauge.dataStore.scenarioStore.get("healthID"))
        .replace("<phone>",gauge.dataStore.scenarioStore.get("patientMobileNumber").slice(3));
}

async function interceptAadhaarVerifyOtp() {
    var verifyOtp = await replacePopulateAadharDetails(fileExtension.parseContent("./data/confirm/aadhaar.txt"));
    var response = {
        method: 'POST',
        body: verifyOtp,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/verifyOTP", response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + "hiprovider/v2/registration/aadhaar/verifyOTP")
}

async function interceptAadhaarVerifyOtpExistingABHANo() {
    var verifyOtp = await replacePopulateAadharDetails(fileExtension.parseContent("./data/confirm/aadhaarDetailsForExistingAbhaNo.txt"));
    var response = {
        method: 'POST',
        body: verifyOtp,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/verifyOTP", response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + "hiprovider/v2/registration/aadhaar/verifyOTP")
}

async function interceptAadhaarGenerateMobileOtp() {
    var generateMobileOtpBody = {
        "mobileLinked": "false"
    };
    var strGenerateMobileOtpBody = JSON.stringify(generateMobileOtpBody);
    var response = {
        method: 'POST',
        body: generateMobileOtpBody,
        headers: {
            'Content-Type': 'application/json',
            'content-length': strGenerateMobileOtpBody.length

        }
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/checkAndGenerateMobileOTP", response, 1)
}

async function interceptAadhaarVerifyMobileOtp() {
    var response = {
        method: 'POST',
        headers: {
            'content-length': '0'
        }
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/verifyMobileOTP", response, 1)
}

async function interceptCreateHealthIdByAadhaar() {
    var createHealthIdBody = {
        "healthIdNumber": gauge.dataStore.scenarioStore.get("abhaNumber"),
        "mobile": gauge.dataStore.scenarioStore.get("patientMobileNumber").slice(3),
        "token": "automation_test_token",
        "refreshToken": "automation_test_refresh_token"
    }
    var strCreateHealthId = JSON.stringify(createHealthIdBody);
    var response = {
        method: 'POST',
        body: createHealthIdBody,
        headers: {
            'Content-Type': 'application/json',
            'content-length': strCreateHealthId.length

        }
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/createHealthIdByAdhaar", response, 1)
}

async function interceptPhrAddressExist() {
    var response = {
        method: 'GET',
        body: "false",
        headers: {
            'Content-Type': 'text/plain'
        }
    }
    var phrAdd = gauge.dataStore.scenarioStore.get("healthID").split("@")[0]
    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/search/isExist?phrAddress=" + phrAdd, response, 1)
}
async function interceptPhrLinked() {
    var response = {
        method: 'POST',
        status: 202
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v2/account/phr-linked", response, 1)
}
async function interceptExistingPatientForAbhaAddress() {
    var existingPatientBody = {
        "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
    };
    var strExistingPatientBody = JSON.stringify(existingPatientBody);
    var response = {
        method: 'GET',
        body: existingPatientBody,
        headers: {
            'Content-Type': 'application/json',
            'content-length': strExistingPatientBody.length
        }
    }
    var patientFirstName = gauge.dataStore.scenarioStore.get("patientFirstName")
    var patientMiddleName = gauge.dataStore.scenarioStore.get("patientMiddleName")
    var patientLastName = gauge.dataStore.scenarioStore.get("patientLastName")
    var patientYearOfBirth = gauge.dataStore.scenarioStore.get("yearOfBirth")
    var patientGender = gauge.dataStore.scenarioStore.get("patientGender").slice(0, 1)
    var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber").slice(3)
    await intercept(process.env.bahmniHost + "/openmrs/ws/rest/v1/hip/existingPatients?patientName=" + patientFirstName + "+" + patientMiddleName + "+" + patientLastName + "&patientYearOfBirth=" + patientYearOfBirth + "&patientGender=" + patientGender + "&phoneNumber=" + mobileNumber, response, 1)
}
async function interceptNdhmDemographics() {
    var response = {
        method: 'POST',
        headers: {
            'content-length': '0'
        }
    }

    await intercept(process.env.bahmniHost + "hiprovider/v0.5/hip/ndhm-demographics", response, 1)
}
async function interceptEmailPhoneInit() {
    var response = {
        method: 'POST',
        status: 202
    }

    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/login/mobileEmail/init", response, 1)
}
async function interceptPreVerification(strBody) {
    var response = {
        method: 'POST',
        body: strBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/login/mobileEmail/preVerification", response, 1)
}

async function interceptAuthMethods() {
    var strAuthBody = { "healthIdNumber": gauge.dataStore.scenarioStore.get("abhaNumber"), "authMethods": ["AADHAAR_OTP", "MOBILE_OTP"], "status": "ACTIVE", "blockedAuthMethods": [] }
    var strAuthMethodBody = JSON.stringify(strAuthBody);
    var response = {
        method: 'POST',
        status: 202,
        body: strAuthBody,
        headers: {
            'Content-Type': 'application/json',
            'content-length': strAuthMethodBody.length
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/registration/hid/search/auth-methods", response, 1)
}

async function interceptInitTransaction() {
    var response = {
        method: 'POST',
        status: 202
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/login/init/transaction?authMode=AADHAAR_OTP", response, 1)
}

async function interceptGetUserToken() {
    var response = {
        method: 'POST',
        status: 202,
        body: {},
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/login/mobileEmail/getUserToken", response, 1)
}

async function interceptHID() {
    var response = {
        method: 'POST',
        status: 202,
        body: { "success": "true" },
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v1/phr/profile/link/hid", response, 1)
}

async function interceptAadhaarVerifyOtpMatchingRecord() {
    var verifyOtp = await replacePopulateAadharDetails(fileExtension.parseContent("./data/confirm/aadhaarDetailsForMatchingRecord.txt"));
    var response = {
        method: 'POST',
        body: verifyOtp,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/verifyOTP", response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + "hiprovider/v2/registration/aadhaar/verifyOTP")
}

async function interceptAadhaarVerifyOtpExistingABHANoABHAAddress(){
    var verifyOtp = await replacePopulateAadharDetails(fileExtension.parseContent("./data/confirm/aadhaarDetailsForExistingAbhaNoAbhaAddress.txt"));
    console.log(verifyOtp)
    var response = {
        method: 'POST',
        body: verifyOtp,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await intercept(process.env.bahmniHost + "/hiprovider/v2/registration/aadhaar/verifyOTP", response, 1)
    gauge.message("intercepted" + process.env.bahmniHost + "hiprovider/v2/registration/aadhaar/verifyOTP")
}

module.exports = {
    interceptFetchModes: interceptFetchModes,
    interceptAuthInit: interceptAuthInit,
    interceptExistingPatients: interceptExistingPatients,
    interceptAuthConfirm: interceptAuthConfirm,
    redirectExistingPatients: redirectExistingPatients,
    interceptExistingPatientsWithParams: interceptExistingPatientsWithParams,
    deleteAbhaAddress: deleteAbhaAddress,
    interceptAadhaarGenerateOtp: interceptAadhaarGenerateOtp,
    interceptAadhaarVerifyOtp: interceptAadhaarVerifyOtp,
    interceptAadhaarGenerateMobileOtp: interceptAadhaarGenerateMobileOtp,
    interceptAadhaarVerifyMobileOtp: interceptAadhaarVerifyMobileOtp,
    interceptCreateHealthIdByAadhaar: interceptCreateHealthIdByAadhaar,
    interceptPhrAddressExist: interceptPhrAddressExist,
    interceptPhrLinked: interceptPhrLinked,
    interceptExistingPatientForAbhaAddress: interceptExistingPatientForAbhaAddress,
    interceptNdhmDemographics: interceptNdhmDemographics,
    interceptEmailPhoneInit: interceptEmailPhoneInit,
    interceptPreVerification: interceptPreVerification,
    interceptAuthMethods: interceptAuthMethods,
    interceptInitTransaction: interceptInitTransaction,
    interceptGetUserToken: interceptGetUserToken,
    interceptHID: interceptHID,
    interceptAadhaarVerifyOtpExistingABHANo: interceptAadhaarVerifyOtpExistingABHANo,
    interceptAadhaarVerifyOtpMatchingRecord:interceptAadhaarVerifyOtpMatchingRecord,
    interceptAadhaarVerifyOtpExistingABHANoABHAAddress:interceptAadhaarVerifyOtpExistingABHANoABHAAddress

}

