// @ts-check
const { test, expect } = require('@playwright/test');

// 실제 서버(cafe24) 대신 로그인 API 응답을 가짜로 만들어주는 헬퍼
// -1: 미가입, 0: 비밀번호 오류, 1: 성공
async function mockSigninApi(page, result) {
  await page.route('**/soomgo_user_signin_action.jsp**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(result) })
  );
}

test.describe('로그인', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./#/login');
  });

  const emailInput = (page) => page.getByPlaceholder('example@soomgo.com');
  const pwInput = (page) => page.getByPlaceholder('영문+숫자 조합 8자리 이상 입력해주세요');
  const loginBtn = (page) => page.getByRole('button', { name: '이메일 로그인' });

  test('이메일 없이 로그인하면 안내 모달이 뜨고, 확인으로 닫힌다', async ({ page }) => {
    await loginBtn(page).click();
    await expect(page.getByText('이메일을 입력해주세요')).toBeVisible();

    await page.getByRole('button', { name: '확인' }).click();
    await expect(page.getByText('이메일을 입력해주세요')).toBeHidden();
  });

  test('비밀번호 없이 로그인하면 안내 모달이 뜬다', async ({ page }) => {
    await emailInput(page).fill('test@soomgo.com');
    await loginBtn(page).click();
    await expect(page.getByText('비밀번호를 입력해주세요', { exact: true })).toBeVisible();
  });

  test('비밀번호가 틀리면 오류 모달이 뜬다 (API 모킹)', async ({ page }) => {
    await mockSigninApi(page, 0);
    await emailInput(page).fill('test@soomgo.com');
    await pwInput(page).fill('abcd1234');
    await loginBtn(page).click();
    await expect(page.getByText('비밀번호를 확인 후 다시 시도해주세요.')).toBeVisible();
  });

  test('미가입 회원이면 회원가입 페이지로 이동한다 (API 모킹)', async ({ page }) => {
    await mockSigninApi(page, -1);
    await emailInput(page).fill('nobody@soomgo.com');
    await pwInput(page).fill('abcd1234');
    await loginBtn(page).click();
    await expect(page.getByText('가입회원이 아닙니다.')).toBeVisible();
    await expect(page).toHaveURL(/#\/join/);
  });

  test('로그인 성공 시 홈으로 이동하고 localStorage에 저장된다 (API 모킹)', async ({ page }) => {
    await mockSigninApi(page, 1);
    await emailInput(page).fill('test@soomgo.com');
    await pwInput(page).fill('abcd1234');
    await loginBtn(page).click();

    await expect(page.getByText('로그인 되었습니다.')).toBeVisible();
    await expect(page).toHaveURL(/#\/home/);

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('SOOMGOUSERLOGIN')));
    expect(saved.user_email).toBe('test@soomgo.com');
  });
});
