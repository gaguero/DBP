const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to your local development server
  await page.goto('http://localhost:3001');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ 
    path: 'homepage-layout.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved as homepage-layout.png');
  await browser.close();
})();