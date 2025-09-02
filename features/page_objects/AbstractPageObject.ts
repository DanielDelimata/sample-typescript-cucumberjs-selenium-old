import { WebDriver } from 'selenium-webdriver';

export abstract class AbstractPageObject {
    protected readonly driver: WebDriver;

    protected constructor(driver: WebDriver) {
        this.driver = driver;
    }
}