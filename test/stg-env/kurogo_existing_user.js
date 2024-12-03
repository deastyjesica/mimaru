const {By, Key, Builder, until} = require('selenium-webdriver');
require('chromedriver');
const createDriver = require('./driver');
const assert = require('assert');
const fs = require('fs');

let credentials;
    try {
        const data = fs.readFileSync('credentials.json', 'utf8');
        credentials = JSON.parse(data);
    } catch (error) {
        console.error('Error reading credentials file:', error);
        process.exit(1); 
    }

describe('E2E UPBOND Mimaru Kurogo STG', function(){
    this.timeout(200000);
    let driver;
    before(async function(){
        driver = await createDriver();
    });
    after(async function () {
        await driver.quit();
    });
    it('01. Login Existing User LINE', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();
        await driver.get('https://stg.d3sllht4la3b94.amplifyapp.com/luggage-delivery/nft/en');
        await driver.manage().window().maximize();
        await driver.sleep(10000);
        await driver.findElement(By.xpath('//span[text()=" LINE Login"]')).click();
        await driver.sleep(500);

        await driver.wait(until.elementLocated(By.xpath('//div/input[@type="text" and @placeholder="Email address"]')), 500);
        await driver.findElement(By.xpath('//div/input[@type="text" and @placeholder="Email address"]')).sendKeys(credentials.USRLINE_deastyj);
        await driver.sleep(500);
        await driver.findElement(By.xpath("//input[@name='tpasswd']")).sendKeys(credentials.PWDLINE);
        await driver.sleep(500);
        await driver.findElement(By.xpath('//button[text()="Log in"]')).click();
        await driver.sleep(8000);

        await driver.wait(until.elementLocated(By.xpath('//span[text()="Stablecoin Balance"]')), 8000);
        await driver.sleep(500);
        await driver.quit();
    })

    it.skip('02. Login Existing User Facebook', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();

        await driver.get('https://stg.d3sllht4la3b94.amplifyapp.com/luggage-delivery/nft/en');
        await driver.manage().window().maximize();
        await driver.sleep(10000);
        await driver.findElement(By.xpath('//span[text()=" Facebook Login"]')).click();
        await driver.sleep(500);
    
        // Login using Facebook Social
        await driver.findElement(By.xpath('//input[@type="text" and @placeholder="Email address or phone number"]')).sendKeys(credentials.USRFB_deasty);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//input[@type="password" and @placeholder="Password"]')).sendKeys(credentials.PWDFB);
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//button[text()="Log in"]')).click();
        await driver.sleep(5000);
        await driver.findElement(By.xpath('//span[text()="Continue as Deasty"]')).click();
        await driver.sleep(10000);

        await driver.sleep(500);
        await driver.quit();
    })

    it('03. Login Existing User Google', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();

        await driver.get('https://stg.d3sllht4la3b94.amplifyapp.com/luggage-delivery/nft/en');
        await driver.manage().window().maximize();
    
        // Login using Google
        await driver.findElement(By.xpath('//span[text()=" Google Login"]')).click();
        await driver.findElement(By.xpath('//input[@type="email" and @name="identifier"]')).sendKeys(credentials.USRGOOGLE);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//span[text()="Next"]')).click();
        await driver.sleep(5000);
        await driver.wait(until.elementLocated(By.xpath('//input[@type="password" and @name="Passwd"]')), 5000);
        await driver.findElement(By.xpath('//input[@type="password" and @name="Passwd"]')).sendKeys(credentials.PWDGOOGLE);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//span[text()="Next"]')).click();
        await driver.sleep(20000);

        await driver.wait(until.elementLocated(By.xpath('//span[text()="Stablecoin Balance"]')), 8000);
        await driver.sleep(500);
        await driver.quit();
    })
    
    it('04. Login Existing User OTP', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();

        await driver.get('https://stg.d3sllht4la3b94.amplifyapp.com/luggage-delivery/nft/en');
        await driver.manage().window().maximize();
    
        // Login using OTP Email
        await driver.findElement(By.xpath('//span[@id="otp-btn" and @class="new-style-button-text text-center text-otp"]')).click();
        await driver.wait(until.elementLocated(By.xpath('//input[@type="text" and @id="otp-email"]')), 5000);
        await driver.findElement(By.xpath('//input[@type="text" and @id="otp-email"]')).sendKeys(credentials.USROTP);
        await driver.findElement(By.xpath('//button[@type="submit" and @id="otp-button"]')).click();
        await driver.sleep(3000);

        // Switch new tab to get OTP code
        let current_window = await driver.getWindowHandle();
        await driver.switchTo().newWindow('tab');
        let windows = await driver.getAllWindowHandles();
        let tab;
        windows.forEach(async handle =>{
            if (handle!=current_window){
                tab = handle;
            }
        });
        await driver.get('https://mail.google.com/');
        await driver.manage().window().maximize();
        await driver.findElement(By.xpath('//input[@type="email" and @name="identifier"]')).sendKeys(credentials.USRGOOGLE);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//span[text()="Next"]')).click();
        await driver.sleep(2500);
        await driver.wait(until.elementLocated(By.xpath('//input[@type="password" and @name="Passwd"]')), 1000);
        await driver.findElement(By.xpath('//input[@type="password" and @name="Passwd"]')).sendKeys(credentials.PWDGOOGLE);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//span[text()="Next"]')).click();
        await driver.sleep(5000);
        await driver.wait(until.elementLocated(By.xpath('(//a[@title="Gmail" and @href="#inbox"])[2]')), 5000);
        let topEmail = await driver.wait(until.elementLocated(By.css('tr.zA.zE')), 3000);
        await topEmail.click();
        let otpElement = await driver.findElement(By.xpath('(//p)[3]'));
        let otpCode = await otpElement.getText();
    
        // Back to login 3.0 page
        await driver.getAllWindowHandles();
        await driver.switchTo().window(current_window);
        for (let i = 0; i < otpCode.length; i++) {

            let inputElement = await driver.wait(until.elementLocated(By.id(`handleInput${i + 1}`)), 3000);
            await inputElement.sendKeys(otpCode[i]);
            await driver.sleep(1000);
        };
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//button[@type="submit"]')).click();
        await driver.sleep(20000);

        await driver.wait(until.elementLocated(By.xpath('//span[text()="Stablecoin Balance"]')), 8000);
        await driver.sleep(500);
        await driver.quit();
    })
})