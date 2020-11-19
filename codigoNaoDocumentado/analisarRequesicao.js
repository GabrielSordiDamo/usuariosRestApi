
const analisarRequisicao = (requisicao, resposta) => {
    const { isUrlValida, isIdExisteNaUrl, pegueIdDaUrl } = require('./utilidades/url')
    const { isDadosDoUsuarioValidos, isAlgumDosDadosDoUsuarioValidos } = require('./utilidades/verificarDadosDoUsuario')
    const { formatarDadosDoUsuario, formatarApenasDadosValidosDoUsuario } = require('./utilidades/formatarDadosDoUsuario')
    let { responderComSucesso, responderSemSucesso } = require('./utilidades/formatarRespostaDaRequisicao')
    let CRUD = require('./database/CRUD')

    responderComSucesso = responderComSucesso(resposta)
    responderSemSucesso = responderSemSucesso(resposta)
    CRUD = new CRUD()

    const url = requisicao.url
    if (!isUrlValida(url)) {
        responderSemSucesso(400, 'Url invalida')
        return
    }

    let corpoDaRequisicao = ''
    const metodoDaRequisicao = requisicao.method
    let id = null
    let dadosFormatados = null
    switch (metodoDaRequisicao) {
        case 'POST':
            requisicao.on('data', chunk => {
                corpoDaRequisicao += chunk.toString(); // convert Buffer to string
            });
            requisicao.on('end', () => {
                console.log(corpoDaRequisicao)
                corpoDaRequisicao = JSON.parse(corpoDaRequisicao)
                if (isDadosDoUsuarioValidos(corpoDaRequisicao)) {
                    dadosFormatados = formatarDadosDoUsuario(corpoDaRequisicao)
                    CRUD.inserirNaTabela(dadosFormatados, responderComSucesso, responderSemSucesso)
                } else { responderSemSucesso(400, 'Dados invalidos') }
            });
            break
        case 'PUT':
            requisicao.on('data', chunk => {
                corpoDaRequisicao += chunk.toString(); // convert Buffer to string
            });
            requisicao.on('end', () => {
                console.log(corpoDaRequisicao)
                corpoDaRequisicao = JSON.parse(corpoDaRequisicao)
                if (!isIdExisteNaUrl(url)) {
                    responderSemSucesso(400, 'E necessario o id do usuario que tera as informacoes atualizadas')
                } else {
                    id = pegueIdDaUrl(url)
                    if (isAlgumDosDadosDoUsuarioValidos(corpoDaRequisicao)) {
                        dadosFormatados = formatarApenasDadosValidosDoUsuario(corpoDaRequisicao)
                        CRUD.atualizarNaTabela(id, dadosFormatados, responderComSucesso, responderSemSucesso)
                    } else {
                        responderSemSucesso(400, 'No minimo, e necessario um dado valido a ser atualizado')
                    }
                }
            });
            break
        case 'DELETE':
            if (!isIdExisteNaUrl(url)) {
                responderSemSucesso(400, 'E necessario o id do usuario a ser deletado')
            } else {
                id = pegueIdDaUrl(url)
                CRUD.deletarNaTabela(id, responderComSucesso, responderSemSucesso)
            }
            break
        case 'GET':
            if (isIdExisteNaUrl(url)) { id = pegueIdDaUrl(url) }
            CRUD.selecionarDaTabela(id, responderComSucesso, responderSemSucesso)
            break
        default:
            break
    }
}

module.exports = analisarRequisicao