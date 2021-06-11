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
} = require('taiko');
var _date = require("../util/date");
var _fileExtension = require("../util/fileExtension");

step("Start an Special OPD Visit", async function() {
    await click(button(toRightOf('Start OPD Visit')))
    await click('Start Special OPD Visit')
});

step("Open Programs module", async function() {
    await goto(process.env.bahmniHome)
    await click("Programs");
});

step("Enroll in program <program> stage <programStage> starting <numberOfYearsAgo_startDate> years ago with treatment start <numberOfYearsAgo_treatmentDate> years ago, id <id>, dr incharge <doctor> and treatment stage <stage>", 
async function (program, programStage, numberOfYearsAgo_startDate, numberOfYearsAgo_treatmentDate, id, doctor, stage) {
    await highlight('New Program Enrollment')
    await click('New Program Enrollment')
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
	await click($('.proggram-dashboard-text'));
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

    await attach(path.join("./data/program"+'programReport1.jpg'),await fileField({title:"Upload your file"}))
    await click('Save')
});