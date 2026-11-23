// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('홈 & 내비게이션', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('홈 화면이 열리고 로고가 보인다', async ({ page }) => {
    await expect(page.getByAltText('숨고 로고')).toBeVisible();
    await expect(page.getByRole('link', { name: '로그인' })).toBeVisible();
    await expect(page.getByRole('button', { name: '고수가입' })).toBeVisible();
  });

  test('상단 메뉴로 고수찾기 / 커뮤니티 페이지 이동', async ({ page }) => {
    // 상단 내비게이션 영역 안에서만 찾기 (푸터에도 같은 이름 링크가 있음)
    const nav = page.locator('.nav-bar__list');
    await nav.getByRole('link', { name: '고수찾기', exact: true }).click();
    await expect(page).toHaveURL(/#\/finding/);

    await nav.getByRole('link', { name: '커뮤니티', exact: true }).click();
    await expect(page).toHaveURL(/#\/community/);
  });

  test('회원가입 / 로그인 링크 이동', async ({ page }) => {
    await page.getByRole('link', { name: '회원가입' }).first().click();
    await expect(page).toHaveURL(/#\/join/);

    await page.getByRole('link', { name: '로그인' }).click();
    await expect(page).toHaveURL(/#\/login/);
  });

  test('검색창에 입력하고 닫기 버튼으로 지우기', async ({ page }) => {
    const search = page.getByPlaceholder('어떤 서비스가 필요하세요?');
    await search.click();
    await search.fill('영어 과외');
    await expect(search).toHaveValue('영어 과외');

    await page.getByAltText('닫기 버튼').click();
    await expect(search).toHaveValue('');
  });
});
