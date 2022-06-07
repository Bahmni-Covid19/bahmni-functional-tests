const axios = require('axios')
const assert = require("assert");
const date = require("../bahmni-e2e-common-flows/tests/util/date")
const omod = require("./util/omod")

step("Verify match with NDHM record with age less than 2 years", async function() {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName");
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
    var fullName = firstName+"+"+lastName;

    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    var age = gauge.dataStore.scenarioStore.get("patientAge");
    var yearOfBirth = date.getDateYearsAgo(age-2).getFullYear();
    var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
    var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
    assert.ok(result.length==1)
});

step("Verify match with NDHM record with age more than 2 years", async function() {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName");
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
    var fullName = firstName+"+"+lastName;

    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    var age = gauge.dataStore.scenarioStore.get("patientAge");
    var yearOfBirth = date.getDateYearsAgo(age+2).getFullYear();
    var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
    var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
    assert.ok(result.length==1)
});

step("Verify match with NDHM record with with different mobile number <mobileNumber>", async function (mobileNumber) {
    var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
    var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName");
    var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
    var fullName = firstName+"+"+lastName;

    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    var age = gauge.dataStore.scenarioStore.get("patientAge");
    var yearOfBirth = date.getDateYearsAgo(age).getFullYear();
    var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
    assert.ok(result.length==1)
});

step(["Verify match with NDHM record with one letter changed in firstName <firstName>",
    "Verify match with NDHM record with one letter missing in firstName <firstName>"], async function(firstName) {
        var middleName = gauge.dataStore.scenarioStore.get("patientMiddleName");
        var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
        var fullName = firstName+"+"+lastName;
    
        var gender = gauge.dataStore.scenarioStore.get("patientGender");
        var age = gauge.dataStore.scenarioStore.get("patientAge");
        var yearOfBirth = date.getDateYearsAgo(age).getFullYear();
        var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
        var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
        assert.ok(result.length==1)    
    });

step("Verify match with NDHM record with firstName <firstName> middleName <middleName> lastName <lastName>", 
async function (firstName, middleName, lastName) {
    var fullName = firstName+"+"+lastName;

    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    var age = gauge.dataStore.scenarioStore.get("patientAge");
    var yearOfBirth = date.getDateYearsAgo(age).getFullYear();
    var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");
    var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
    assert.ok(result.length==1)    
});

step("Verify match with NDHM record with only firstName <firstName>", async function(firstName) {
    var fullName = firstName;
    
    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    var age = gauge.dataStore.scenarioStore.get("patientAge");
    var yearOfBirth = date.getDateYearsAgo(age).getFullYear();
    var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");

    var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
    assert.ok(result.length==1)    
});

step("Verify match with NDHM record with one letter more in firstName <firstName> lastName <lastName>", async function(firstName, lastName) {
    var fullName = firstName+"+"+lastName;
    
    var gender = gauge.dataStore.scenarioStore.get("patientGender");
    var age = gauge.dataStore.scenarioStore.get("patientAge");
    var yearOfBirth = date.getDateYearsAgo(age).getFullYear();
    var mobileNumber = gauge.dataStore.scenarioStore.get("patientMobileNumber");

    var result = await omod.getNDHMRecord(fullName,gender,yearOfBirth,mobileNumber)
    assert.ok(result.length==1)    
});