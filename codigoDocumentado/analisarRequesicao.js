
const analisarRequisicao = (requisicao, resposta) => {
    const { isUrlValida, isIdExisteNaUrl, pegueIdDaUrl } = require('./utilidades/url')
    //desestrutura o objeto importado pelo require, e armaza as propriedades dele
    //nas respectivas variaveis que contem o mesmo nome
    const { isDadosDoUsuarioValidos, isAlgumDosDadosDoUsuarioValidos } = require('./utilidades/verificarDadosDoUsuario')
    //desestrutura o objeto importado pelo require, e armaza as propriedades dele
    //nas respectivas variaveis que contem o mesmo nome
    const { formatarDadosDoUsuario, formatarApenasDadosValidosDoUsuario } = require('./utilidades/formatarDadosDoUsuario')
    //desestrutura o objeto importado pelo require, e armaza as propriedades dele
    //nas respectivas variaveis que contem o mesmo nome
    let { responderComSucesso, responderSemSucesso } = require('./utilidades/formatarRespostaDaRequisicao')
    //desestrutura o objeto importado pelo require, e armaza as propriedades dele
    //nas respectivas variaveis que contem o mesmo nome
    let CRUD = require('./database/CRUD')
    //armazena a classe CRUD na variavel CRUD

    responderComSucesso = responderComSucesso(resposta)
    //aplica o metodo de currying, tambem conhecido como padrao decorator
    //o resultado e uma funcao para respondermos a requisicao quando houver sucesso
    responderSemSucesso = responderSemSucesso(resposta)
    //aplica o metodo de currying, tambem conhecido como padrao decorator
    //o resultado e uma funcao para respondermos a requisicao quando houver erro
    CRUD = new CRUD()
    //cria uma instancia do CRUD.
    //o crud e inicilizado com os valores padroes do construtor
    //podem ser passados configuracoes diferentes se desejado
    //CRUD e um singleton

    const url = requisicao.url
    //armazena a url que esta dentro do objeto requisicao
    //dentro de uma constante url
    if (!isUrlValida(url)) {
        //o metodo isUrlValida e invocado
        //ele analisara a url
        //se for valida retorna true, ao contrario retornara false
        responderSemSucesso(400, 'Url invalida')
        //se a url nao for valida, ja podemos dar uma resposta
        //invocamos responderSemSucesso()
        //passamos como argumento um status do erro, e uma descricao do erro
        return
        //retornamos, assim o servidor pode continuar a fazer o seu trabalho
        //e receber novas requisicoes
    }

    let corpoDaRequisicao = ''
    //inicializamos uma variavel que contera
    //o JSON do corpo da requisicao, isso e, se houver
    //um corpo a ser processado
    const metodoDaRequisicao = requisicao.method
    //armazenamos o metodo da requisicao contido no objeto requisicao
    //em uma constante
    let id = null
    //inicilizamos a variavel id
    //o valor inicial e null
    //porem se o metodo da requisicao precisar
    //do id, vamos verificar se ele existe
    //na url e vamos extrailo
    let dadosFormatados = null
    //se a requisicao contiver um body/corpo, entao
    //teremos que antes armazenalo na variavel corpoDaRequisicao
    //entao formataremos ele, e armazenaremos o resultado em dadosFormatos
    switch (metodoDaRequisicao) {
        //Realizamos um switch case sobre uma string
        //Js te permite fazer isso!
        case 'POST':
            //Caso o metodo da requicao for POST
            //O metodo post possui um body/corpo de requiscao
            //que contem os dados do usuario
            //Se lembra da funcao  http.createServer()
            //ela e chamada assim que o header da requisicao esta disponivel
            //porem o corpo ainda nao esta disponivel quando isso acontece
            //o corpo e um stream de dados que continua a chegar
            //quando o corpo chega ele dispira eventos especificos
            //o evento 'data' e disparado sempre que um pedaco do corpo chega
            //Em requisicao.on('data), ....), passamos uma funcao para tratar do evento
            //a funcao que passamos tem como parametro, chunk
            //chunk e o pedaco de dados que chegou no momento e que e passado para nossa funcao
            requisicao.on('data', chunk => {
                corpoDaRequisicao += chunk.toString();
                //pegamos os dados e os convertemos para string
                //assim conseguimos concatenar os pedacinhos de dado
                //dentro de uma string, onde tudo fica junto
            });
            requisicao.on('end', () => {
                //assim como 'data' e o evento chamado na chegada
                //de um pedaco novo de data, quando toda a data ja chegou
                //o evento 'end' e desencadeado
                //passamos uma funcao para tratar desse evento
                //nesse momento todo corpo da requisicao ja esta pronto
                //e esta armazenado dentro da variavel corpoDaRequisicao
                //que foi declarada logo antes do switch
                corpoDaRequisicao = JSON.parse(corpoDaRequisicao)
                //utilizamos do JSON.parse() que recebe um string
                //que e o nosso corpo da requisicao e a tranforma
                //em um objeto valido, isso so ocorre se o a string
                //estiver um um formato JSON valido
                //agora nosso corpo da requisicao nao contem uma string
                //mas um objeto completamente utilizavel
                if (isDadosDoUsuarioValidos(corpoDaRequisicao)) {
                    //nada garante que os dados sejam validos
                    //utilizamos a funcao importante antes para validalos
                    //se estiver tudo certo receberemos true, senao false
                    dadosFormatados = formatarDadosDoUsuario(corpoDaRequisicao)
                    //de os dados forem validos, nos o formatamos antes de mandar
                    //os mesmos para proseguirem e serem inseridos no banco de dados
                    //assim temos os dadosFormatados
                    CRUD.inserirNaTabela(dadosFormatados, responderComSucesso, responderSemSucesso)
                    //o verbo post cria uma novo recurso/usuario
                    //entao utilizamos o metodo de nosso crud para inserir os dadosFormatados no db
                    //passamos tambem como argumento as funcoes responderComSucesso e 
                    //responderComErro assim a funcao inserir na tabela pode responder a requisicao
                    //dentro dela mesma
                } else { responderSemSucesso(400, 'Dados invalidos') }
                //Se os dados do corpoDaRequisicao nao forem validos
                //respondemos sem sucesso
            });
            break
        case 'PUT':
            //O verbo put atualiza um recurso/usuario
            //Assim como o metodo post, put tambem possui corpo da requisicao
            //entao a etapa de enviar uma funcao para responder ao evento 'data'
            //e 'end' se repetem
            requisicao.on('data', chunk => {
                corpoDaRequisicao += chunk.toString();
            });
            requisicao.on('end', () => {
                corpoDaRequisicao = JSON.parse(corpoDaRequisicao)
                if (!isIdExisteNaUrl(url)) {
                    //Put atualiza as informacoes de um usuario
                    //para identificar o usuario utilizamos o id
                    //entao temos que verificar se ha um id na ur
                    responderSemSucesso(400, 'E necessario o id do usuario que tera as informacoes atualizadas')
                    //se nao houver id na url, respondemos sem sucesso
                } else {
                    //caso hava id na url
                    id = pegueIdDaUrl(url)
                    //nos pegamos ele
                    if (isAlgumDosDadosDoUsuarioValidos(corpoDaRequisicao)) {
                        //Porem aida temos que testar a validade dos dados
                        //Nao utilizamos a mesma funcao em POST para fazer a validacao dos dados
                        //isso acontece porque aqui podemos ter apenas uma propriedades
                        //para ser atualizada, por exemplo, podemos ter so o nome, o telefone
                        //ou so o mail, se o dado for valido, entao apenas ele sera atulizado
                        //no usuario
                        dadosFormatados = formatarApenasDadosValidosDoUsuario(corpoDaRequisicao)
                        //Os dados sao formatados, novamente uma funcao diferente de antes
                        //para fazer a formatacao dos dados
                        CRUD.atualizarNaTabela(id, dadosFormatados, responderComSucesso, responderSemSucesso)
                        //Passamos o id, os dados formatados e as funcoes de resposta para nosso crud
                    } else {
                        responderSemSucesso(400, 'No minimo, e necessario um dado valido a ser atualizado')
                        //Se nao houver nem um dadao valido, respondemos sem sucesso
                    }
                }
            });
            break
        case 'DELETE':
            //Delete ao contrario dos metodos anteriores
            //nao precisa de um de requisicao
            //ele deleta todas informacoes do usuario baseado no id da url
            //entao procuramos o id na url
            if (!isIdExisteNaUrl(url)) {
                //se nao houver id
                responderSemSucesso(400, 'E necessario o id do usuario a ser deletado')
                //respondemos sem sucesso
            } else {
                id = pegueIdDaUrl(url)
                //se houver id pegamos o id da url
                CRUD.deletarNaTabela(id, responderComSucesso, responderSemSucesso)
                //chamamos nosso crud passando nosso id e as funcoes de resposta
            }
            break
        case 'GET':
            //O nao precisa de corpo da requisicao
            //e pode ou nao conter id
            //um id existente significa pegar so o usuario correspondete
            //com aquele id
            //sem id, pegar todos usuarios
            if (isIdExisteNaUrl(url)) { id = pegueIdDaUrl(url) }
            //se o id existe na url, entao nos pegamos ele
            CRUD.selecionarDaTabela(id, responderComSucesso, responderSemSucesso)
            //chamamos nosso crud, passando o id e as funcoes de resposta
            //se lembra que haviamos inicilizado nosso id antes do switch
            //como null, entao se nao houver id
            //o valor do mesmo sera null e o CRUD sabera que e para pegar todos os usuarios
            break
        default:
            break
    }
    //o switch termina
}

module.exports = analisarRequisicao
//exportamos nossa funcao analisar requisicao