const isTelefoneValido = (telefone) => {
    if (!telefone) { return false }
    //Primeiro verificamos se telefone nao e uma string vazia ou indefinido
    //se for nao e um telefone valido e o retornamos
    regex = /\s*(\(\d{2}\)|\d{2}){1}\s*(\d{4,5}-?\d{4}){1}\s*(?!.)/gi
    //criamos uma regez para identificar algums padroes validos de telefone
    //alguns dos padroes validos que ela identifica sao:
    // (11) 12345678, 1112345678, 11123456789, 54 1234-5678...
    if (telefone.search(regex) == -1) {
        //Se telefone nao poder ser expresse pela expresao regular
        //nao atende ao padrao do telefone retornamos false
        return false
    } else {
        //senao retornamos true
        return true
    }
}

const isNomeValido = (nome) => {
    if (!nome) { return false }
    //se o nome for uma string vazia ou indefinido
    //nao e valido
    regex = /^(([a-zA-Z ])*)$/gi
    //criamos uma regex para identificar se o nome e valido
    //nao ha muito que essa regez faca
    //ela verifica se os carecteres sao letras, se sao espacos
    //e isso e permitido
    //porem numeros e caracteres especiais nao sao permitidos
    if (nome.search(regex) == -1) {
        //se o nome nao puder ser expresso pela nossa epxresao
        //nao atende as exigencias, retonamos false
        return false
    } else {
        //se puder ser expresso, atende as exigencias, retornamos true
        return true
    }
}

const isMailValido = (mail) => {
    if (!mail) { return false }
    //se email for uma string vazia ou indefinido, nao e valido
    regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    //so de cara da pra ver que eu nao fiz essa regex, nem me atrevo a explicar tudo que ela verifica
    //mas ela garante expressar quase todos padros de email possiveis, VIVA A INTERNET!
    if (mail.search(regex) == -1) {
        //se o mail nao puder ser expresso por essa regex
        //nao e validos
        return false
    } else {
        //senao, ele e valido
        return true
    }
}

const isDadosDoUsuarioValidos = (dadosDoUsuario) => {
    //esse metodo e utilizado com verbos como post
    //onde e necessario todos as propriedades presentes
    //e validas
    const { nome, telefone, mail } = dadosDoUsuario
    //dados do usuario e um objeto
    //nos os desestruturamos
    return isNomeValido(nome) && isTelefoneValido(telefone) && isMailValido(mail) ? true : false
    //e entao realizamo um operacao ternaria com o resultado das validacoes
    //OS DADOS SO SERAO VALIDOS, true, SE TODOS OS TADOS FOREM VALIDADOS COM SUCESSO
    //UM UNICO DADDO NAO VALIDO COM SUCESSO GERARA false
}

const isAlgumDosDadosDoUsuarioValidos = (dadosDoUsuario) => {
    //esse metodo e utilizado com verbos como put
    //onde, no caso do put, atualizar um usuario
    //nao requer todos as propriedadas validas
    //ate porque pode-se desejar atulizar somente
    //o o nome, ou telefone..
    const { nome, telefone, mail } = dadosDoUsuario
    //o objeto de dados e desestruturado
    //podemos receber apenas um campo em dados do usuario
    //como so o nome, nesse caso as outras propriedades possuem valor
    //de indefinido -> undefined
    return isNomeValido(nome) || isTelefoneValido(telefone) || isMailValido(mail) ? true : false
    //e feita uma operacao ternaria em cima das validacoes dos campos. 
    //UM DELES SER VALIDO JA E SUFICIENTE PARA RETORNAMOS true, MAS
    //SE NEM UM DOS CAMPOS FOR VALIDO, RETORNAMOS false
}
module.exports = {
    isDadosDoUsuarioValidos,
    isAlgumDosDadosDoUsuarioValidos
}
//montamos um objeto com nossas funcoes e o exportamos