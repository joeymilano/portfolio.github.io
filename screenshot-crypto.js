const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  // Navigate to the page
  const filePath = 'file://' + path.resolve(__dirname, 'cryptocopilot.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Wait for content to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Take full page screenshot
  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-full.png',
    fullPage: true
  });

  console.log('Full page screenshot saved!');

  // Take viewport screenshot of hero section
  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-hero.png',
    fullPage: false
  });

  console.log('Hero screenshot saved!');

  // Scroll to showcase section
  await page.evaluate(() => {
    const showcase = document.querySelector('.feature-showcase-grid');
    if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await new Promise(resolve => setTimeout(resolve, 1000));

  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-showcase.png',
    fullPage: false
  });

  console.log('Showcase screenshot saved!');

  // Scroll to craft section
  await page.evaluate(() => {
    const craftSection = document.querySelector('[data-i18n="craft.title"]');
    if (craftSection) craftSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  await new Promise(resolve => setTimeout(resolve, 1000));

  await page.screenshot({
    path: '/Users/joeyzhao/Desktop/cryptocopilot-optimized-craft.png',
    fullPage: false
  });

  console.log('Craft section screenshot saved!');

  await browser.close();
  console.log('All screenshots completed!');
})();
