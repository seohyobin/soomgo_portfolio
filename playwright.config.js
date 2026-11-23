// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173/soomgo/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
  ],
  // 테스트 전에 build/ 폴더를 자동으로 띄움
  webServer: {
    command: 'node e2e/serve-build.js',
    url: 'http://localhost:4173/soomgo/',
    reuseExistingServer: !process.env.CI,
  },
});
