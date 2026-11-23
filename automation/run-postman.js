// [3] Postman 컬렉션을 Newman(Postman CLI 실행기)으로 Node.js에서 실행
// 실행: node automation/run-postman.js
//   - 같은 컬렉션 파일을 Postman 앱에서 Import 해서 버튼으로 실행할 수도 있음
const newman = require('newman');
const path = require('path');

const useMock = !process.env.API;
const server = useMock ? require('./mock-api-server') : null;

const run = () => newman.run({
  collection: path.join(__dirname, 'soomgo-api.postman_collection.json'),
  envVar: process.env.API ? [{ key: 'baseUrl', value: process.env.API }] : [],
  reporters: 'cli',
}, (err, summary) => {
  server && server.close();
  if (err) { console.error(err); process.exit(1); }
  process.exit(summary.run.failures.length ? 1 : 0);
});

useMock ? server.listen(3001, run) : run();
