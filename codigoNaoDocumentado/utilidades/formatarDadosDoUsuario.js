const formatarTelefone = (telefone) => {
    regex = /[\s*\(\)\-]/gi
    telefone = telefone.replace(regex, '')
    return telefone
}

const formatorNome = (nome) => {
    nome = nome.trim()
    const regex = /\s{2,}/gi
    nome = nome.replace(regex, ' ')
    return nome
}
const formatarMail = (mail) => {
    mail = mail.trim()
    return mail
}
const formatarDadosDoUsuario = (dadosDoUsuario) => {
    let { nome, telefone, mail } = dadosDoUsuario
    nome = formatorNome(nome)
    telefone = formatarTelefone(telefone)
    mail = formatarMail(mail)
    return { nome, telefone, mail }
}
const formatarApenasDadosValidosDoUsuario = (dadosDoUsuario) => {
    let { nome, telefone, mail } = dadosDoUsuario
    let dadosValidos = {}
    if (nome) { nome = formatorNome(nome); dadosValidos['nome'] = nome }
    if (telefone) { telefone = formatarTelefone(telefone); dadosValidos['telefone'] = telefone }
    if (mail) { mail = formatarMail(mail); dadosValidos['mail'] = mail }
    return dadosValidos
}
module.exports = {
    formatarDadosDoUsuario,
    formatarApenasDadosValidosDoUsuario
}