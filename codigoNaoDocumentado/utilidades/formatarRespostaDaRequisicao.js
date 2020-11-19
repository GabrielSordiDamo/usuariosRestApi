
let responderSemSucesso = (resposta) => {
    return (status, descricao) => {
        resposta.end(JSON.stringify(
            {
                status: status,
                descricao: descricao
            }))
    }
}

let responderComSucesso = (resposta) => {
    return (status, data, descricao) => {
        resposta.end(JSON.stringify(
            {
                status: status,
                data: data,
                descricao: descricao
            }
        ))
    }
}

module.exports = {
    responderComSucesso,
    responderSemSucesso
}