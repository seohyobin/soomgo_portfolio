// [1] Playwright를 "라이브러리"로 쓰는 순수 Node.js 스크립트 (테스트 러너 없이 node로 실행)
// 실행: node automation/01-browser.js
//   - 사이트 주소는 SITE 환경변수로 바꿀 수 있음 (기본: 로컬 build 서버)
const { chromium } = require('playwright');
const path = require('path');
const { spawn } = require('child_process');

const SITE = process.env.SITE || 'http://localhost:4173/soomgo/';
let passed = 0, failed = 0;

async function check(name, fn) {
  try { await fn(); passed++; console.log(`  ✅ ${name}`); }
  catch (e) { failed++; console.log(`  ❌ ${name}\n     → ${e.message.split('\n')[0]}`); }
}

(async () => {
  // build 폴더 서버를 같이 띄움 (SITE를 지정하지 않은 경우만)
  const server = process.env.SITE ? null
    : spawn('node', [path.join(__dirname, '..', 'e2e', 'serve-build.js')], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 800));

  const browser = await chromium.launch({ headless: true }); // 화면 보려면 headless: false
  const page = await browser.newPage();

  console.log('숨고 브라우저 자동화 시작\n');

  await check('홈 화면 열기 & 로고 확인', async () => {
    await page.goto(SITE);
    await page.getByAltText('숨고 로고').waitFor({ timeout: 5000 });
  });

  await check('고수찾기 메뉴 클릭 → URL 확인', async () => {
    await page.locator('.nav-bar__list').getByRole('link', { name: '고수찾기', exact: true }).click();
    if (!page.url().includes('#/finding')) throw new Error(`현재 URL: ${page.url()}`);
  });

  await check('로그인 페이지에서 이메일 비우고 로그인 → 경고 모달', async () => {
    await page.goto(SITE + '#/login');
    await page.getByRole('button', { name: '이메일 로그인' }).click();
    await page.getByText('이메일을 입력해주세요').waitFor({ timeout: 3000 });
    await page.getByRole('button', { name: '확인' }).click();
  });

  await check('이메일/비밀번호 입력값 확인', async () => {
    await page.getByPlaceholder('example@soomgo.com').fill('test@soomgo.com');
    await page.getByPlaceholder('영문+숫자 조합 8자리 이상 입력해주세요').fill('abcd1234');
    const v = await page.getByPlaceholder('example@soomgo.com').inputValue();
    if (v !== 'test@soomgo.com') throw new Error(`입력값: ${v}`);
  });

  const shot = path.join(__dirname, 'screenshot-login.png');
  await page.screenshot({ path: shot, fullPage: true });
  console.log(`\n📸 스크린샷 저장: ${shot}`);

  await browser.close();
  server && server.kill();

  console.log(`\n결과: ${passed}개 성공 / ${failed}개 실패`);
  process.exit(failed ? 1 : 0);
})();
