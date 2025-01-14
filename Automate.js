const puppeteer = require('puppeteer');

async function automateGoogleLogin() {
  const browser = await puppeteer.launch({ 
    headless: false, 
    slowMo: 50, 
    args: ['--start-maximized']  // this is used for Set the browser to open in full screen by default.
  });

  const page = await browser.newPage();

  // Set the viewport size to mimic full screen (Optional)
  await page.setViewport({ width: 1920, height: 1080 });

  // Open the Google login page
  await page.goto('https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F&ec=GAIAWAE&hl=en&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-1239150625%3A1736422964948967&ddm=1', {
    waitUntil: 'domcontentloaded',
  });

  // Wait for the email/phone field to load
  await page.waitForSelector('#identifierId');
  await page.click('#identifierId'); // Focus on the input field

  // Type your email address and Replace with your email
  await page.type('#identifierId', 'example.gmail.com'); 

  await page.click('#identifierNext');

  await page.waitForSelector('input[name="Passwd"]', { visible: true });

  await page.focus('input[name="Passwd"]');

  // Type your password and Replace with your password
  await page.type('input[name="Passwd"]', 'anonymous'); 

  // Click the "Next" button to complete the login process
  await page.click('#passwordNext');

  // Wait for navigation (Google may have a short delay after clicking 'Next')
  await page.waitForNavigation();

  console.log('Login successful!'); // Log after the login process completes successfully

  // Take a screenshot after login
  
  await page.screenshot({ path: 'google-login-screenshot.png', fullPage: true });

  console.log('Screenshot saved as google-login-screenshot.png');

}

automateGoogleLogin();
