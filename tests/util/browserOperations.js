const {
    openBrowser,
    closeBrowser,
    screenshot,
    // screencast,
} = require('taiko');
const path = require('path');

const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({headless:headless, args:["--no-sandbox","--start-maximized","--disable-dev-shm-usage","--start-fullscreen"]})
    // await screencast.startScreencast('output.gif');
});

afterSuite(async () => {
    // await screencast.stopScreencast();
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};
