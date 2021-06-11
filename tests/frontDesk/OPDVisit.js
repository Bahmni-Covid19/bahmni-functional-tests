/* globals gauge*/
"use strict";

const {
    $,
    dropDown,
    button,
    within,
    highlight,
    toRightOf,
    write,
    goto,
    above,
    click,
    checkBox,
    toLeftOf,
    text,
    into,
    textBox,
    waitFor,
    confirm,
    accept,
    scrollDown
} = require('taiko');
var _ndhm = require("../util/ndhm");
var _users = require("../util/users");

step("Login as a receptionist with admin credentials location <location>", async function (location) {
    await write(_users.getReceptionistUserName(), into(textBox(toRightOf("Username *"))));
    await write(_users.getReceptionistPassword(), into(textBox(toRightOf("Password *"))));
    await dropDown("Location").select(location);
    await click(button("Login"));
});

step("Goto Bahmni home", async function () {
    await goto(process.env.bahmniHome);
});

step("Create a new patient with verfication id", async function () {
    await click("Create New");
});

step("Enter registration fees <arg0>", async function (arg0) {
    await write("100", into(textBox(toRightOf("Registration Fees"))));
});

step("Go back to home page", async function () {
    await goto(process.env.bahmniHost+ "/bahmni/home/index.html#/dashboard")
    //await click($('.back-btn'));
});

step("Open newly created patient details by search", async function () {
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    await write(patientIdentifierValue, into(textBox({ "placeholder": "Enter ID" })))
    await click("Search", toRightOf(patientIdentifierValue));
});

step("Verify if healthId entered already exists", async function () {
    await _ndhm.interceptExistingPatients(process.env.receptionist,gauge.dataStore.scenarioStore.get("healthID"))
});

step("waitFor <time>", async function (time) {
    await waitFor(time)
});

step("Enter OTP for health care validation <otp> for with new healthID, patient details and mobileNumber <patientMobileNumber>",
    async function (otp, patientMobileNumber) {
        await write(otp, into(textBox(above("Confirm"))));  
        var firstName = gauge.dataStore.scenarioStore.get("patientFirstName");
        var lastName = gauge.dataStore.scenarioStore.get("patientLastName");
        var healthID = gauge.dataStore.scenarioStore.get("healthID");
        var yearOfBirth = "2000";
        var gender = "F";
        const token = process.env.receptionist
        await _ndhm.interceptAuthConfirm(token,healthID,firstName,lastName,yearOfBirth,gender,patientMobileNumber);
        await _ndhm.interceptExistingPatientsWithParams(token,firstName,lastName,yearOfBirth,gender);

        await click(button("Confirm"))
        await click(button("Create New Record"))
        await click(button("Update"),{force: true})
    });

step("Enter visit details", async function() {
	await click(button("Enter Visit Details"))
});

step("Close visit", async function() {
    await confirm('Are you sure you want to close this visit?', async () => await accept())
	await click(button("Close Visit"))
});

step("Log out", async function () {
    try
    {
        await click(button({"class":"btn-user-info fr"}))
        await click('Logout')    
    }catch(e){}
});

step("Enter village <village>", async function(village) {
	await write(village, into(textBox(toRightOf("Village"))))
});

step("Click on home page and goto registration module", async function () {
    await click($(".back-btn"))
    await click('Registration')
});