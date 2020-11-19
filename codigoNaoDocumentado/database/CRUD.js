const mysql = require('mysql2')
mysql.cre
class CRUD {
    conexao = null
    instancia = null
    nomeDoBancoDeDados = 'usuarios'
    nomeDaTabela = 'info_dos_usuarios'
    constructor(host = '127.0.0.1', port = 3306, user = 'root', password = 'admin') {
        if (CRUD.instancia == null) {
            const config = {
                host: host,
                port: port,
                user: user,
                password: password
            }

            this.conexao = mysql.createConnection(config)
            this.criarBancoDeDados()
            this.criarTabelaDeUsuario()
            CRUD.instancia = this
            return this
        }
        return CRUD.instancia
    }


    criarBancoDeDados = () => {
        let query = `CREATE DATABASE IF NOT EXISTS ${this.nomeDoBancoDeDados}`
        this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            console.log(`${this.nomeDoBancoDeDados} database ja existente, ou criado`)
        })

    }

    criarTabelaDeUsuario = () => {
        let query = ` 
                CREATE TABLE IF NOT EXISTS ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                nome VARCHAR(300) NOT NULL,
                mail VARCHAR(300) NOT NULL,
                telefone VARCHAR(40) NOT NULL,
                PRIMARY KEY(id));`
        this.conexao.query(query,
            (err, resultado) => {
                if (err) throw err;
                console.log('Tabela existente, ou criada')
            })
    }

    selecionarDaTabela = (id = null, responderComSucesso, responderSemSucesso) => {
        const query = id === null ? `SELECT * FROM ${this.nomeDoBancoDeDados}.${this.nomeDaTabela}` :
            `SELECT * FROM  ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} WHERE id=${id}`
        let resultado = this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            if (resultado.length == 0) {
                responderSemSucesso(404, 'Nao ha usuario com esse id, ou o nao ha usuarios')

            } else {
                responderComSucesso(200, resultado, 'Array com usuario(s)')
            }
            return
        })
    }


    deletarNaTabela = (id = null, responderComSucesso, responderSemSucesso) => {

        const query = `DELETE FROM ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} WHERE id=${id}`
        this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            resultado.affectedRows == 0 ?
                responderSemSucesso(404, 'Usuario nao existente') :
                responderComSucesso(204, '', 'Usuario deletado com sucesso')
        })
    }

    derrubarTabela = (query) => {
        this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            console.log('Tabela derrubada com sucesso')
        })
    }

    inserirNaTabela = (dadosDoUsuario, responderComSucesso, responderSemSucesso) => {
        let { nome, mail, telefone } = dadosDoUsuario
        let query = `INSERT INTO ${this.nomeDoBancoDeDados}.${this.nomeDaTabela}
            (nome, mail, telefone)
            VALUES ('${nome}', '${mail}', '${telefone}')`

        let teste = this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            return resultado
        })
        responderComSucesso(201, `${nome}, ${mail}, ${telefone}`, 'Armazenados com sucesso')
    }


    atualizarNaTabela = (id = null, dadosDoUsuario, responderComSucesso, responderSemSucesso) => {
        let oqueAtualizar = ''
        for (let key in dadosDoUsuario) {
            oqueAtualizar = oqueAtualizar + ` ${key}='${dadosDoUsuario[key]}',`
        }
        oqueAtualizar = oqueAtualizar.replace(/(,(?!\s))/gi, '')
        let query = `UPDATE ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} 
            SET ${oqueAtualizar} 
            WHERE id = ${id}`
        this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            resultado.affectedRows == 0 ?
                responderSemSucesso(404, 'Usuario nao existente') :
                responderComSucesso(204, '', 'Informacoes do usuario atualizadas com sucesso')
        })
    }


}



module.exports = CRUD
