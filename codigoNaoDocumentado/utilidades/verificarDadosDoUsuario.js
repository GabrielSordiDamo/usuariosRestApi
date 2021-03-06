const isTelefoneValido = (telefone) => {
    if (!telefone) { return false }
    regex = /\s*(\(\d{2}\)|\d{2}){1}\s*(\d{4,5}-?\d{4}){1}\s*(?!.)/gi
    if (telefone.search(regex) == -1) {
        return false
    } else {
        return true
    }
}

const isNomeValido = (nome) => {
    if (!nome) { return false }
    regex = /^(([a-zA-Z ])*)$/gi
    if (nome.search(regex) == -1) {
        return false
    } else {
        return true
    }
}

const isMailValido = (mail) => {
    if (!mail) { return false }
    regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (mail.search(regex) == -1) {
        return false
    } else {
        return true
    }
}

const isDadosDoUsuarioValidos = (dadosDoUsuario) => {
    const { nome, telefone, mail } = dadosDoUsuario
    return isNomeValido(nome) && isTelefoneValido(telefone) && isMailValido(mail) ? true : false
}

const isAlgumDosDadosDoUsuarioValidos = (dadosDoUsuario) => {
    const { nome, telefone, mail } = dadosDoUsuario
    return isNomeValido(nome) || isTelefoneValido(telefone) || isMailValido(mail) ? true : false
}
module.exports = {
    isDadosDoUsuarioValidos,
    isAlgumDosDadosDoUsuarioValidos
}