const { Builder, By, Key, until } = require("selenium-webdriver");
var assert = require("assert");
let axios = require("axios");
var terminate = require("terminate");
let zooServerProc = require("child_process").exec('"node" ./index.js', {
  cwd: __dirname + "/ZOO_app"
});

let createAnimal = async (name, kind) => {
  await axios.post("http://localhost:3000/animals", {
    name: name,
    kind: kind
  });
};
let prepareServer = async () => {
  await createAnimal("Ola", "Lion");
  await createAnimal("Maciek", "Baboon");
  await createAnimal("Marek", "Tiger");
  await createAnimal("Lukasz", "Chimpanzee");
};

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await prepareServer();
    await driver.sleep(1000);
    await driver.get(
      "file:///C:/Users/HP/Desktop/Ola_IT/ZOO_app_client/index.html"
    );

    assert.equal(await checkImage("Lion"), true);
    assert.equal(await checkLabel("Lion"), true);
    assert.equal(await checkLabel("Ola"), true);
    await clickRightButton();
    assert.equal(await checkImage("Baboon"), true);
    assert.equal(await checkLabel("Baboon"), true);
    assert.equal(await checkLabel("Maciek"), true);
    await clickRightButton();
    assert.equal(await checkImage("Tiger"), true);
    assert.equal(await checkLabel("Tiger"), true);
    assert.equal(await checkLabel("Marek"), true);
    await clickRightButton();
    assert.equal(await checkImage("Chimpanzee"), true);
    assert.equal(await checkLabel("Chimpanzee"), true);
    assert.equal(await checkLabel("Lukasz"), true);

    async function checkImage(animalName) {
      let fruitImages = await driver.findElements(
        By.css("img[src*='" + animalName.toLowerCase() + "']")
      );
      let foundImage = fruitImages.length != 0;
      return foundImage;
    }
    async function checkLabel(animalName) {
      let spans = await driver.findElements(By.css("div > span"));
      let foundLabel = false;
      for (let i = 0; i < spans.length; i++) {
        let readLabel = await spans[i].getText();
        if (readLabel == animalName) {
          foundLabel = true;
          break;
        }
      }
      return foundLabel;
    }
    async function clickRightButton() {
      let rightButtons = await driver.findElements(By.css(".arrow.right"));
      let animalRightButton = rightButtons[1];
      await animalRightButton.click();
    }
  } finally {
    zooServerProc.kill();
    terminate(process.pid);
    await driver.quit();
  }
})();
