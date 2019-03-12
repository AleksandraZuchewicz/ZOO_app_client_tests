const wdio = require("webdriverio");
let assert = require("assert");
const opts = {
  port: 4723,
  capabilities: {
    platformName: "Android",
    deviceName: "Android Emulator",
    browserName: "Chrome"
  }
};

(async function() {
  const client = await wdio.remote(opts);
  let BrowserUrl = "http://mactwa.pl/zoo/";
  await client.url(BrowserUrl);
  assert.equal(await checkImage("Banana"), true);
  assert.equal(await checkLabel("Banana"), true);
  await clickRightButton();
  assert.equal(await checkImage("Grapes"), true);
  assert.equal(await checkLabel("Grapes"), true);
  await clickRightButton();
  assert.equal(await checkImage("Pork"), true);
  assert.equal(await checkLabel("Pork"), true);
  await clickRightButton();
  assert.equal(await checkImage("Chicken"), true);
  assert.equal(await checkLabel("Chicken"), true);

  async function checkImage(fruitName) {
    let fruitImages = await client.$$(
      "img[src*='" + fruitName.toLowerCase() + "']"
    );
    let foundImage = fruitImages.length != 0;
    return foundImage;
  }
  async function checkLabel(fruitName) {
    let spans = await client.$$("div > span");
    let foundLabel = false;
    for (let i = 0; i < spans.length; i++) {
      let readLabel = await spans[i].getText();
      if (readLabel == fruitName) {
        foundLabel = true;
        break;
      }
    }
    return foundLabel;
  }
  async function clickRightButton() {
    let rightButtons = await client.$$(".arrow.right");
    let foodRightButton = rightButtons.pop();
    await foodRightButton.click();
  }
})(); // IIFE - Immedietly invoked function expresion
