const http = require('http');
const parse = require('querystring')
const analisarRequisicao = require('./analisarRequesicao')

const server = http.createServer((requisicao, resposta) => {
  analisarRequisicao(requisicao, resposta)
});

server.listen(3000);
