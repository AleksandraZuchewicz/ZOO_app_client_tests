const { Builder, By, Key, until } = require("selenium-webdriver");
var assert = require("assert");
(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(
      "file:///C:/Users/HP/Desktop/Ola_IT/ZOO_app_client/index.html"
    );

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
      let fruitImages = await driver.findElements(
        By.css("img[src*='" + fruitName.toLowerCase() + "']")
      );
      let foundImage = fruitImages.length != 0;
      return foundImage;
    }
    async function checkLabel(fruitName) {
      let spans = await driver.findElements(By.css("div > span"));
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
      let rightButtons = await driver.findElements(By.css(".arrow.right"));
      let foodRightButton = rightButtons.pop();
      await foodRightButton.click();
    }
    /*
    await kochamCie.sendKeys("Kocham Cie");
    await driver.sleep(1000);
    await driver
      .findElement(
        By.className(
          "src-tts left-positioned ttsbutton jfk-button-flat source-or-target-footer-button jfk-button"
        )
      )
      .click();
    await driver.sleep(5000);
    */
  } finally {
    await driver.quit();
  }
})();
