const {
    $,
    click,
    goto,
    button,
    toRightOf,
    highlight,
    dropDown,
    write,
    textBox,
    into,
    timeField,
    waitFor,
    attach,
    fileField,
    below,
} = require('taiko');
var _date = require("../util/date");
var _fileExtension = require("../util/fileExtension");
var _path = require("path")

step("Click Start Special OPD Visit", async function() {
    await click(button(toRightOf('Start OPD Visit')))
    await click('Start Special OPD Visit',{waitForNavigation:true})
});

step("Open Programs module", async function() {
    await click("Programs",{waitForNavigation:true,waitForEvents:['networkIdle']});
});

step("Enroll in program <program> stage <programStage> starting <numberOfYearsAgo_startDate> years ago with treatment start <numberOfYearsAgo_treatmentDate> years ago, id <id>, dr incharge <doctor> and treatment stage <stage>", 
async function (program, programStage, numberOfYearsAgo_startDate, numberOfYearsAgo_treatmentDate, id, doctor, stage) {
    await highlight('New Program Enrollment')
    await click('New Program Enrollment',below("Date of birth"))
    await waitFor(1000)
    await dropDown(toRightOf('Program')).select(program)
    
    var startDate = _date.getDateYearsAgo(numberOfYearsAgo_startDate);
    await timeField({type:"date"},toRightOf("Start Date")).select(startDate);

    var treatmentDate = _date.getDateYearsAgo(numberOfYearsAgo_treatmentDate);
    await timeField({type:"date"},toRightOf("Treatment Date")).select(treatmentDate);

    await write(id, into(textBox(toRightOf('ID Number'))))
    // await dropDown(toRightOf('Program Stage')).select(programStage)
    await write(doctor, into(textBox(toRightOf('Doctor-In-Charge'))))
    await dropDown(toRightOf('Patient Stage')).select(stage)
    await click(button('Enroll'),{waitForNavigation:true})
});

step("Open the program dashboard <program>", async function(program) {
    await waitFor(3000)
    await click($('.proggram-dashboard-text'),{waitForNavigation:true});
    await waitFor(3000)
});

step("Enter History and examination details", async function() {
    var historyAndExaminationDetails = JSON.parse(_fileExtension.parseContent("./data/program/historyAndExaminationDetails.json"))

    for(var chiefComplaint of historyAndExaminationDetails.Chief_Complaints){
        await write(chiefComplaint.Chief_Complaint,into(textBox(toRightOf("Chief Complaint"))));
        await click('Accept');
        await write(chiefComplaint.for, into(textBox(toRightOf("for"))));    
        await dropDown(toRightOf("for")).select(chiefComplaint.for_frequency);
    }
    await write(historyAndExaminationDetails.Chief_complaint_notes,into(textBox("Chief Complaint Notes")));
    await write(historyAndExaminationDetails.History_Notes,into(textBox("History Notes")));
    await write(historyAndExaminationDetails.Examination_notes,into(textBox("Examination Notes")));
    await click(historyAndExaminationDetails.Smoking_History,toRightOf("Smoking History"));

    await attach(_path.join("./data/program/"+'programReport1.jpg'),fileField({id:"file-browse-observation_9"}));
    await click('Save',{waitForNavigation:true});
});

step("Goto All sections and search the newly created patient", async function () {
    await waitFor("All")
    await click("All",{force:true})
    var patientIdentifierValue = gauge.dataStore.scenarioStore.get("patientIdentifier");

    await write(patientIdentifierValue, into(textBox({ "placeholder": "Search Name/Patient Identifier  ..." })))
    await click('Search',{waitForNavigation:true})
});