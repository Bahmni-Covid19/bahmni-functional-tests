const {
    openBrowser,
    closeBrowser,
    screenshot,
    setConfig,
} = require('taiko');
const path = require('path');

const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({headless:headless,
        args: ["--start-maximized","--start-fullscreen"]
    })
    await setConfig({navigationTimeout:180000})
});

afterSuite(async () => {
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
