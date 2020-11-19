//utilizamos a tecnica de currying ou padrao decorator
//ou lazy evaluation.... mesma coisa
//para criar funcoes que recevem uma resposta
//e retornam uma funcao que se lembra da resposta
//passada para primeira funcao
//entao podemos acessar essa referencia por meio 
//da funcao retornada
let responderSemSucesso = (resposta) => {
    //recebemos o objeto que contera nossa resposta
    return (status, descricao) => {
        //retornamos uma funcao que recebra um estatus e uma descricao
        //a nossa funcao se lembra da resposta que foi passa antes
        //assim podemos a referenciar
        resposta.end(JSON.stringify(
            {
                status: status,
                descricao: descricao
            }))
        // nos juntamos o status e a descricao em um objeto
        //e o toramos uma string json valida
        //por meio de JSON.stringfy()
        //enfim passamos o nosso JSON
        //como resposta final da requisicao
    }
}

let responderComSucesso = (resposta) => {
    //responder com sucessso tambem recebe a mesma resposta
    //mas retorna uma funcao um pouco diferente
    return (status, data, descricao) => {
        //a funcao e tambem recebe um status e uma descricao
        //mas tambem data, se respondermos com sucesso
        //apartir de um verbo get
        //a nossa data pode ser os usuarios ou usuario
        //se for a patir de um metodo delete
        //uma string vazia...
        resposta.end(JSON.stringify(
            {
                status: status,
                data: data,
                descricao: descricao
            }
        ))
        //Repetimos o processo, tornar tudo um objeto
        //e entao json
        //terminar a resposta respondendo com o json
    }
}


module.exports = {
    responderComSucesso,
    responderSemSucesso
}
//exportamos um objeto contendo nossas funcoes