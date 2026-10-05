import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './site/tests', timeout: 30000, fullyParallel: true,
 use: { baseURL: 'http://127.0.0.1:4173', headless: true,
 launchOptions: { executablePath: 'C:/Users/jvgsl/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' } },
 webServer: { command: 'node site/scripts/serve.mjs', url:'http://127.0.0.1:4173', reuseExistingServer:true },
 reporter: 'list', outputDir:'site/qa/test-results'
});
