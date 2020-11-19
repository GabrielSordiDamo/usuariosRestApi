const formatarTelefone = (telefone) => {
    //recebemos a string telefone ja validado
    regex = /[\s*\(\)\-]/gi
    //montamos uma expresao regular que ira
    //retirar o (), - e os espacos em branco
    telefone = telefone.replace(regex, '')
    //aplicamos nossa regex em telefone e
    //o retornamos
    return telefone
}

const formatorNome = (nome) => {
    //recebemos uma string nome
    nome = nome.trim()
    //retiramos todos espacos em branco na frente ou atras
    const regex = /\s{2,}/gi
    //montamos uma regex que verificarara
    //se ha mais de um espaco em branco separando as palavras
    nome = nome.replace(regex, ' ')
    //se houver mais um espaco em branco ele e substituido
    //com um unico espaco em branco
    return nome
}
const formatarMail = (mail) => {
    //recebemos uma string mail
    mail = mail.trim()
    //retiramos os espacos em branco nas extremidades
    //e retornamos
    return mail
}
const formatarDadosDoUsuario = (dadosDoUsuario) => {
    //Aqui e certo que receberemos todos os tres dados
    //para serem formatados
    let { nome, telefone, mail } = dadosDoUsuario
    //eles estao em formato de objeto
    //entao os descontruimos
    nome = formatorNome(nome)
    telefone = formatarTelefone(telefone)
    mail = formatarMail(mail)
    //aplicamos a formatacao em cima de cada um
    return { nome, telefone, mail }
    //montamos um novo objeto com os dados ja formatados 
    //e o retornamos
}
const formatarApenasDadosValidosDoUsuario = (dadosDoUsuario) => {
    //Aqui podemos nao receber todos os tres dados
    let { nome, telefone, mail } = dadosDoUsuario
    //De qualquer maneira receberemos um objeto
    //o descontruirmos
    //vamos dizer que apenas recebemos o telefone
    //nesse caso o valor de nome e mail sera undefined
    //undefined tem correspondende booleando -> false
    //usaremos isso para retornar um objeto valido
    let dadosValidos = {}
    //inicializamos um objeto que contera os dados formatados
    if (nome) { nome = formatorNome(nome); dadosValidos['nome'] = nome }
    //se o nome nao for indefinido, nem um string vazia, que tambem seria false
    //entao o formatamos, e criamos uma pripriedade nome dentro de dados validos
    //cujo valor e nome formatado
    if (telefone) { telefone = formatarTelefone(telefone); dadosValidos['telefone'] = telefone }
    if (mail) { mail = formatarMail(mail); dadosValidos['mail'] = mail }
    //o mesmo paso e aplicado para os outros dados
    //assim no final apenas teremos em dadosValidados propriedades com valores validos
    //e formatados
    return dadosValidos
}
module.exports = {
    formatarDadosDoUsuario,
    formatarApenasDadosValidosDoUsuario
}
//exportamos um objeto contendo nossas duas funcoes de suporte para validcao dos dados