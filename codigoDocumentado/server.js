const http = require('http');
//armazena a dependencia http na constante http
const parse = require('querystring')
//armazena a dependencia querystring na constante parse
const analisarRequisicao = require('./analisarRequesicao')
//armazena o funcao analisar requisicao na constante analisar requisicao
const server = http.createServer((requisicao, resposta) => {
  //cria um servidor http
  //e passado uma funcao como argumento para httt.createServer
  //a funcao recebe dois parametros
  //a requisicao que contem a requisicao httt
  //a resposta que contera o que sera enviado devolta
  analisarRequisicao(requisicao, resposta)
  //a requisicao, junto com o objeto resposta, sao
  //enviados para a funcao analisar requisicao onde 
  //serao processados
});

server.listen(3000);
//o servidor ficara ouvindo a porta 3000
