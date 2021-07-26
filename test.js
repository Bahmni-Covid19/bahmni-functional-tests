const { openBrowser, goto, toRightOf, textBox, into, write, dropDown, button, click, press, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser({headless:false});
        await goto("https://demo.mybahmni.org/bahmni/home/index.html#/login");
        await write("superman",into(textBox(toRightOf("Username"))));
        await write("Admin123",into(textBox(toRightOf("Password"))));
        await dropDown("Location").select("General Ward");
        await click(button("Login"));
        await click("Clinical");
        await write("GAN203013");
        await press("Enter");
        await click("Consultation");
        await click("Add New Obs Form",{waitForNavigation:true,navigationTimeout:180000});
        await click("Diabetes – Progress")
        await waitFor(async () => !(await $("overlay").exists()))
        await write("A1C",into(textBox(toRightOf("A1C"))));
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();