
const isUrlValida = (url) => {
    //recebe uma rl
    const regex = /(usuarios)(\/\d+)?(?!.)/gi
    //criamos uma expressao regular para verificar a validade
    //da url, alguns exemplo doq ue sera considerao valido
    //sao :
    //validos: /usuarios, /usuarios/1, /usuarios/10, /usuarios/10000
    //invalidos: /usu, /usuario, /usuario/, usuarios/, /usuarios/a, /usuarios/10 oi

    //entao procuramos pela nossa expressao na regex
    //a serch retorna -1 se nao encontra nossa expresao
    if (url.search(regex) == -1) {
        //se nao encontra a expresao valida entao
        //nao e valida a url
        return false
    } else {
        //se encontra a expresao valida entao e valida a url
        return true
    }
}
const isIdExisteNaUrl = (url) => {
    const regex = /(\/\d+)/
    //criamos uma regex para verificar se o id existe na url
    //isso e feito porque tanto uma ulr no formato
    // /usuarios quanto outra /usuarios/1 sao consideradas
    //validas, mas so uma contem o id
    //entao temos que verificar se ele realmente existe
    if (url.search(regex) == -1) {
        //se nao o encontrarmos retornamos false
        return false
    } else {
        //se o encontrarmos retornamos true
        return true
    }
}
const pegueIdDaUrl = (url) => {
    let regex = /(\/\d+)/
    //criamos uma expresao para primeiramente
    //separar /usuarios de /:id
    //a expresao identificara a barra depois
    //de usuarios e o numero depois dela
    let [numeroPrefixadoComBara] = url.match(regex)
    //pegamos a parte da barra com o id /:id
    let [numero] = numeroPrefixadoComBara.match(/(\d+)/gi)
    //criamos uma expresao regular (direto dentro de .match())
    //para pegar o numero que segue depois 
    //da barra que separa usuarios/:id de id
    //a expressao identificara apenas o numero
    //depois da barra
    return Number.parseInt(numero)
    //nesse momento a url e um string, logo o numero que pegamos continua
    //sendo uma string o convertemos para inteiro e retornamos
}

module.exports = {
    isUrlValida,
    isIdExisteNaUrl,
    pegueIdDaUrl
}

//criamos um objeto contendo nossas funcoes de suporte e o exportamos