const { openBrowser, goto, toRightOf, textBox, into, write, dropDown, button, click, highlight, toLeftOf, checkBox, $, waitFor, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser({headless:false})
        await goto("https://ndhm-dev.bahmni-covid19.in/bahmni/home/#/dashboard");
        await write("superman",into(textBox(toRightOf("Username *"))));
        await write("Admin1234",into(textBox(toRightOf("Password *"))));
        await dropDown("Location").select("General Ward");
        await click(button("Login"));
        await highlight("Clinical")
        await click("Registration",toLeftOf("Programs"));
        await click("Create New");
        await write("AAA",into(textBox(toRightOf("Patient Name*"))));
        await write("BBB",into(textBox({"placeholder" : "Middle Name"})));
        await write("CCC",into(textBox({"placeholder" : "Last Name"})));
        await dropDown("Gender *").select("Female");
        await write("39", into(textBox(toRightOf("Years"))));
        await click(checkBox(toLeftOf("Estimated")));
        await write("+91-9845348122", into(textBox(toRightOf("Primary Contact"))));
        await click("Save");
        var patientIdentifierValue = await $('#patientIdentifierValue').text();
        await goto("https://ndhm-dev.bahmni-covid19.in/bahmni/registration/index.html#/search")
        await write(patientIdentifierValue,into(textBox({"placeholder" : "Enter ID"})))
        await click("Search",toRightOf(patientIdentifierValue));
        
        await click("Start OPD Visit");
        await write("100", into(textBox(toRightOf("Registration Fees"))));
        await click("Save");

        goto("https://ndhm-dev.bahmni-covid19.in/bahmni/home/index.html#/dashboard")
        await click("Clinical");
        await click("AAA CCC",above(patientIdentifierValue));
        try{
            await click("OK");
        }
        catch(e){}
        await click("Consultation");
        try{
            await click("OK");
        }
        catch(e){}
        await click("Consultation");
        await write("Consultation notes",into(textBox({"placeholder" : "Enter Notes here"})));
        await click("Orders");
        await click("Haemogram");
        await click("Serum");
        await click("Liver Function - General");
        await click("LDH");
        await click("Medications");
        await write("Paracetamol 500mg (Tablet)",into(textBox(toRightOf("Drug Name"))));
	await dropDown({id: 'frequency'}).select("Thrice a day")
        await click("Accept");
        await write("3",into(textBox(toRightOf("Dose"))));
        await write("7",into(textBox(toRightOf("Duration"))));
        await click("Add");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();