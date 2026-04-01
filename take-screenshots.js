const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  // Navigate to the page
  const filePath = 'file://' + path.resolve(__dirname, 'cryptocopilot.html');
  console.log('Loading:', filePath);
  await page.goto(filePath, { waitUntil: 'networkidle' });

  // Wait for fonts and icons to load
  await page.waitForTimeout(2000);

  // Take hero screenshot
  console.log('Taking hero screenshot...');
  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-hero.png',
    fullPage: false
  });

  // Scroll down to showcase section
  console.log('Taking showcase screenshot...');
  await page.evaluate(() => {
    window.scrollTo(0, 800);
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-showcase.png',
    fullPage: false
  });

  // Take full page screenshot
  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-full.png',
    fullPage: true
  });

  await browser.close();
  console.log('✓ All screenshots saved to Desktop!');
})();
