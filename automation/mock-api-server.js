// 실제 JSP(soomgo_user_signin_action.jsp)와 같은 규칙으로 응답하는 가짜 API 서버
//   빈값 → 안내 문구 / 미가입 → -1 / 비밀번호 틀림 → 0 / 성공 → 1
// 실행: node automation/mock-api-server.js   (http://localhost:3001)
const http = require('http');

const USERS = { 'test@soomgo.com': 'abcd1234' }; // 테스트용 가입 회원

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname !== '/JSP/soomgo_user_signin_action.jsp') {
    res.writeHead(404); return res.end('Not Found');
  }
  const email = url.searchParams.get('user_email');
  const pw = url.searchParams.get('user_pw');
  let body;
  if (email === null || pw === null) body = '빈값은 허용하지 않습니다. \n확인하고 다시시도해주세요';
  else if (!(email in USERS)) body = '-1';
  else if (USERS[email] !== pw) body = '0';
  else body = '1';
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  res.end(body + '\n');
});

if (require.main === module) {
  server.listen(3001, () => console.log('가짜 API 서버: http://localhost:3001'));
}
module.exports = server;
