
const isUrlValida = (url) => {
    const regex = /(usuarios)(\/\d+)?(?!.)/gi
    if (url.search(regex) == -1) {
        return false
    } else {
        return true
    }
}
const isIdExisteNaUrl = (url) => {
    const regex = /(\/\d+)/
    if (url.search(regex) == -1) {
        return false
    } else {
        return true
    }
}
const pegueIdDaUrl = (url) => {
    let regex = /(\/\d+)/
    let [numeroPrefixadoComBara] = url.match(regex)
    console.log(numeroPrefixadoComBara)
    let [numero] = numeroPrefixadoComBara.match(/(\d+)/gi)
    return Number.parseInt(numero)
}

module.exports = {
    isUrlValida,
    isIdExisteNaUrl,
    pegueIdDaUrl
}