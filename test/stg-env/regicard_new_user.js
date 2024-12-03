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

describe('E2E UPBOND Mimaru Regicard STG', function(){
    this.timeout(200000);
    let driver;
    before(async function(){
        driver = await createDriver();
    });
    after(async function () {
        await driver.quit();
    });
    it.skip('01. Login New User LINE', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();
        await driver.get('http://mimaru-regicard.stg.upbond.io/');
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

        // nama account line deastyj
        await driver.wait(until.elementLocated(By.xpath('//p[@class="text-lg" and contains(., "line") and contains(., "deastyj")]')), 8000);
        await driver.sleep(500);
        await driver.quit();
    })

    it.skip('02. Login New User Facebook', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();

        await driver.get('http://mimaru-regicard.stg.upbond.io/');
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

    it.skip('03. Login New User Google', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();

        await driver.get('http://mimaru-regicard.stg.upbond.io/');
        await driver.manage().window().maximize();
    
        // Login using Google
        await driver.findElement(By.xpath('//span[text()=" Google Login"]')).click();
        await driver.findElement(By.xpath('//input[@type="email" and @name="identifier"]')).sendKeys(credentials.USRGOOGLE);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//span[text()="Next"]')).click();
        await driver.sleep(5000);
        await driver.wait(until.elementLocated(By.xpath('//input[@type="password" and @name="Passwd"]')), 1000);
        await driver.findElement(By.xpath('//input[@type="password" and @name="Passwd"]')).sendKeys(credentials.PWDGOOGLE);
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//span[text()="Next"]')).click();
        await driver.sleep(11000);

        //step 1/4
        await driver.wait(until.elementLocated(By.xpath('//h1[text()="パスポート事前登録"]')), 11000); //passport pre-registration
        await driver.findElement(By.xpath('//a[text()="パスポート事前登録をする"][1]')).click(); //click register passport
        await driver.wait(until.elementLocated(By.xpath('//button[text()="パスポートを撮影する"]')), 8000);
        await driver.findElement(By.xpath('//button[text()="パスポートを撮影する"]')).click(); //click button popup
        await driver.wait(until.elementLocated(By.xpath('//button[text()="撮影する"]')), 8000);
        await driver.findElement(By.xpath('//button[text()="撮影する"]')).click(); //click take photo
        await driver.findElement(By.xpath('//button[text()="確定する"]')).click(); //click confirm

        //step 2/4
        await driver.wait(until.elementLocated(By.xpath('//p[text()="本人情報の入力"]')), 8000); //wait title 2/4
        await driver.findElement(By.xpath('//input[@placeholder="HANAKO YAMADA"]')).sendKeys("Deasty Google"); //input name
        await driver.findElement(By.xpath('//input[@placeholder="example@example.com"]')).sendKeys(credentials.USRGOOGLE); //input email
        await driver.findElement(By.xpath('//button[@type="submit" and text()="次へ"]')).click(); //click next

        //step 3/4
        await driver.wait(until.elementLocated(By.xpath('//p[text()="入力内容の確認"]')), 8000); //wait title 3/4
        await driver.findElement(By.xpath('//button[text()="本人確認を行う"]')).click(); //click verify ur identity 

        //step 4/4
        await driver.wait(until.elementLocated(By.xpath('//p[text()="顔認証して連携する"]')), 8000); //wait title 3/4
        await driver.findElement(By.xpath('//button[text()="本人確認を行う"]')).click(); //click verify ur identity 
        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
        await driver.sleep(1000); 
        await driver.findElement(By.xpath('//button[text()="撮影する"]')).click(); //click take photo

        await driver.findElement(By.xpath('//button[text()="確定する"]')).click(); //click confirm photo 
        await driver.findElement(By.xpath('//button[text()="パスポート登録HOMEへ"]')).click(); //click go home popup
        
        //name account Google Deasty
        await driver.wait(until.elementLocated(By.xpath('//p[@class="text-lg" and contains(., "Google") and contains(., "Deasty")]')), 8000);
        await driver.sleep(500);
        await driver.quit();
    })
    
    it.skip('04. Login New User OTP', async function(){
        const chai = await import('chai');
        chai.should();
        let driver = await createDriver();

        await driver.get('http://mimaru-regicard.stg.upbond.io/');
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

        //name account ww
        await driver.wait(until.elementLocated(By.xpath('//p[@class="text-lg" and contains(., "ww")]')), 8000);
        await driver.sleep(500);
        await driver.quit();
    })
})