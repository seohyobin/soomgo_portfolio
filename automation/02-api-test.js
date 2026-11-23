// [2] Node.js 내장 기능(fetch + assert)만으로 만드는 API 테스트
// 실행: node automation/02-api-test.js
//   - API 주소는 API 환경변수로 바꿀 수 있음 (예: API=http://janeseo0530.cafe24.com)
//   - 지정 안 하면 로컬 가짜 서버(mock-api-server.js)를 자동으로 띄워서 테스트
const assert = require('node:assert/strict');

const API = process.env.API || 'http://localhost:3001';
const SIGNIN = `${API}/JSP/soomgo_user_signin_action.jsp`;

async function signin(params) {
  const url = `${SIGNIN}?${new URLSearchParams(params)}`;
  const start = Date.now();
  const res = await fetch(url, { method: 'POST' });
  const text = (await res.text()).trim();
  return { status: res.status, text, ms: Date.now() - start };
}

const cases = [
  { name: '가입 회원 + 올바른 비밀번호 → 1', params: { user_email: 'test@soomgo.com', user_pw: 'abcd1234' }, expect: '1' },
  { name: '가입 회원 + 틀린 비밀번호 → 0',   params: { user_email: 'test@soomgo.com', user_pw: 'wrong999' }, expect: '0' },
  { name: '미가입 이메일 → -1',              params: { user_email: 'nobody@soomgo.com', user_pw: 'abcd1234' }, expect: '-1' },
  { name: '비밀번호 누락 → 빈값 안내 문구',   params: { user_email: 'test@soomgo.com' }, expectIncludes: '빈값은 허용하지 않습니다' },
];

(async () => {
  let server;
  if (!process.env.API) {
    server = require('./mock-api-server');
    await new Promise((r) => server.listen(3001, r));
  }

  console.log(`API 테스트: ${SIGNIN}\n`);
  let failed = 0;
  for (const c of cases) {
    try {
      const r = await signin(c.params);
      assert.equal(r.status, 200, '상태 코드는 200이어야 함');
      if (c.expect !== undefined) assert.equal(r.text, c.expect);
      if (c.expectIncludes) assert.ok(r.text.includes(c.expectIncludes), `응답: ${r.text}`);
      assert.ok(r.ms < 2000, `응답 시간 초과: ${r.ms}ms`);
      console.log(`  ✅ ${c.name} (${r.ms}ms)`);
    } catch (e) {
      failed++;
      console.log(`  ❌ ${c.name}\n     → ${e.message.split('\n')[0]}`);
    }
  }

  server && server.close();
  console.log(`\n결과: ${cases.length - failed}개 성공 / ${failed}개 실패`);
  process.exit(failed ? 1 : 0);
})();
