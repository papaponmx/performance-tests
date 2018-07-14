const puppeteer = require("puppeteer");

// TODO: Move this to a config.js and add interactive CLI capabilities
const config = {
  devRelease: {
    env: "development",
    url: "riosjaime.com"
  },
  localRelease: {
    env: "local",
    url: "http://localhost:3000"
  }
};

puppeteer.launch().then(async browser => {
  const page = await browser.page();

  const metrics = await page.metrics();

  // TODO: Add link here that allows you to genereate metrics report

  await console.log(metrics.LayoutDuration);
  await console.log(metrics.ScriptDuration);
});
