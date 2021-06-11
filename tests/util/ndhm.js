"use strict";

const {
    intercept
} = require('taiko');
var _fileExtension = require("./fileExtension");

async function interceptFetchModes(token) {
    //https://mixedanalytics.com/knowledge-base/api-connector-encode-credentials-to-base-64/

    await intercept(process.env.bahmniHost+ "/ndhm/null/v0.5/hip/fetch-modes", (request) => {
        var body1 = {
            "authModes": [
                "MOBILE_OTP",
                "AADHAAR_OTP"
            ]
        };
        var reqBodyOnFetchModes = JSON.stringify(body1);
        request.respond({
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
        })
    })
}

async function interceptAuthInit(token) {
    var reqBodyOnFetchModes = JSON.stringify("");

    await intercept(process.env.bahmniHost+ "/ndhm/null/v0.5/hip/auth/init", (request) => {
        request.respond({
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
        })
    })
}

async function interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,patientMobileNumber){
    var confirm = _fileExtension.parseContent("./data/confirm/simple.txt")
    .replace('<healthID>', healthID)
    .replace('<fullName>', firstName +" " + lastName)
    .replace('<gender>', gender)
    .replace('<yearOfBirth>', yearOfBirth)
    .replace('<district>', "NORTH AND MIDDLE ANDAMAN")
    .replace('<state>', "ANDAMAN AND NICOBAR ISLANDS")
    .replace('<mobileNumber>', patientMobileNumber)
    .replace('<healthNumber>', "00-0000-0000-0000");
    await intercept(process.env.bahmniHost+ "/ndhm/null/v0.5/hip/auth/confirm", (request) => {
        request.respond({
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
        })
    });
}

async function interceptExistingPatients(token, healthID){
    await intercept(process.env.bahmniHost+ "/ndhm/null/existingPatients/" + healthID, (request) => {
        var body1 = {
            "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
        };
        var reqBodyOnFetchModes = JSON.stringify(body1);
        request.respond({
            method: 'POST',
            port: '9052',
            body: body1,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'content-length': reqBodyOnFetchModes.length
            }
        })
    })
}

async function interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender){
    var existingPatientUrl = process.env.bahmniHost+ "/ndhm/null/existingPatients?patientName=" + 
    firstName + "+" + lastName
    + "&patientYearOfBirth=" + yearOfBirth + "&patientGender=" + gender;

    await intercept(existingPatientUrl, (request) => {
        var body1 = {
            "error": { "code": "PATIENT_ID_NOT_FOUND", "message": "No patient found" }
        };
        var reqBodyOnFetchModes = JSON.stringify(body1);
        request.respond({
            method: 'GET',
            port: '9052',
            body: body1,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'content-length': reqBodyOnFetchModes.length
            }
        })
    })
}

module.exports={
    interceptFetchModes:interceptFetchModes,
    interceptAuthInit:interceptAuthInit,
    interceptExistingPatients:interceptExistingPatients,
    interceptAuthConfirm:interceptAuthConfirm,
    interceptExistingPatientsWithParams:interceptExistingPatientsWithParams
}