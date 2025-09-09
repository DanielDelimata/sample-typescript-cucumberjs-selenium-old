import { After, AfterAll, BeforeAll, Status } from 'cucumber';
import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

export let driver!: WebDriver;

BeforeAll(async () => {
    const options = new Options()
        .addArguments("--headless=new")
        .addArguments("--window-size=640,480")
        .addArguments("--disable-gpu")
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
        .addArguments("--disable-extensions")
        .addArguments("--disable-infobars");

    driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    return driver.manage().window().maximize();
});

AfterAll(async () => driver.quit());

After(async function (this: any, scenario: { result: { status: any; }; }) {
    if (scenario.result?.status === Status.FAILED) {
        const attach = this.attach;
        const png = await driver.takeScreenshot();
        const decodedImage = Buffer.from(png, "base64");
        return attach(decodedImage, "image/png");
    }
});