const mysql = require('mysql2')
//importamos a dependencia mysql2 e a armazenamos numa constante
class CRUD {
    //definimos uma classe CRUD
    //as proximas variaveis sao variaveis de Classe
    conexao = null
    //inicializamos a variavel de classe conexao como null
    instancia = null
    //inicializamos a varivel de classe instancia como null
    //ela sera utilizada para guardar o singleton do CRUD
    nomeDoBancoDeDados = 'usuarios'
    //aqui definimos o nome do banco de dados
    //que contera a tabela com nossos usuarios
    //caso queria ou seja necessario, ele pode ser mudado
    nomeDaTabela = 'info_dos_usuarios'
    //tambe definimos o nome da tabela que contera nossos usuarios
    //mais uma vez, caso queria ou seja necessario o valor pode ser modificado
    constructor(host = '127.0.0.1', port = 3306, user = 'root', password = 'admin') {
        //constructor e a palavra resevada em js para definir o construtor de uma classe
        //preparamos ele para recebar alguns parametos, que ja possuem valor padrao
        //ou seja caso queira, ou seja necessario, podem ser mudadados
        if (CRUD.instancia == null) {
            //verificamos se ja possuimos uma instancia pronta de nosso crud
            //se nao tivermos entao vamos criar uma
            const config = {
                host: host,
                port: port,
                user: user,
                password: password
            }
            //armazenamos as configuracoes necessarias para criar uma conexao com o banco
            //de dados em um objeto
            this.conexao = mysql.createConnection(config)
            //criamos a conexao e a armazenamos dentro da variavel de classe
            //conexao
            this.criarBancoDeDados()
            //entao chamamos o metodo que criara o banco de dados
            //isso so ocorrera se ele ainda nao existir
            this.criarTabelaDeUsuario()
            //tambem criamos a tabela de usuarios
            //novamente, isso so ocorrera se ela nao existir
            CRUD.instancia = this
            //armazenamos tudo que fizemos ate agora this -> CRUD configurado
            //dentro da variavel de classe CRUD.instancia
            //retornamos nossa insancia configurada
            return this
        }
        //Se ja tivermos uma instancia configurada
        //entao retornamos uma referencia a mesa
        //e temos assim o singleton
        return CRUD.instancia
    }


    criarBancoDeDados = () => {
        let query = `CREATE DATABASE IF NOT EXISTS ${this.nomeDoBancoDeDados}`
        //Criamos a query que ira criar o banco de dados se ele nao existir
        //acessamos nossa conexao e chamamos o metodo query
        //onde passamos a nossa query e uma funcao que sera chamada assim 
        //que a query for finalizada, onde receberemos um erro e o resultado
        this.conexao.query(query, (err, resultado) => {
            if (err) throw err;
            //se algum erro tiver ocorrido o estouramos
            console.log(`${this.nomeDoBancoDeDados} database ja existente, ou criado`)
            //se nao houver errro a base de dados tera sido criada, se ja nao existir
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
        //ja com nosso banco de dados criados, criamos uma tabela no mesmo
        //aqui possuimos uma query contendo o modelo de nosso usuario
        //que possui um id int, nome string, mail string, telefone string
        //e como chave primaria o id
        this.conexao.query(query,
            //realizamos uma query na nossa conexao
            (err, resultado) => {
                if (err) throw err;
                //se houver erro e estourado
                console.log('Tabela existente, ou criada')
                //se nao a tabela tera sido criada, isso se a mesma ainda nao existia
            })
    }

    selecionarDaTabela = (id = null, responderComSucesso, responderSemSucesso) => {
        //selecinar da tabela e chamado pelo verbo get
        const query = id === null ? `SELECT * FROM ${this.nomeDoBancoDeDados}.${this.nomeDaTabela}` :
            `SELECT * FROM  ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} WHERE id=${id}`
        //utilizamos uma operacao ternaria para definir o que iremos selecionar
        //se o id for nulo selecinaremos tudo 
        //senao selecionaremos apenas o usuario daquele id
        this.conexao.query(query, (err, resultado) => {
            //realizamos a query com a conexao
            if (err) throw err;
            //se houver erro o expomos
            if (resultado.length == 0) {
                //se o tamanho do nosso resultado for 0
                //e porque ou nao ha nem um usuario na tabela
                //ou porque nao havia nem um usuario que tivesse aquele id
                responderSemSucesso(404, 'Nao ha usuario com esse id, ou o nao ha usuarios')
                //entao respondemos sem sucesso
            } else {
                //senao nosso reultado nao estiver vazio
                responderComSucesso(200, resultado, 'Array com usuario(s)')
                //respondemos com sucesso, passando o status, o resultado e uma descricao
            }
            return
        })
    }


    deletarNaTabela = (id = null, responderComSucesso, responderSemSucesso) => {
        //deletar na tabela e o metodo utilizado pelo verbo delete
        const query = `DELETE FROM ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} WHERE id=${id}`
        //montamos nossa query para deletar o usualiro que tiver aquele id
        this.conexao.query(query, (err, resultado) => {
            //fazemo a query com a conexao
            if (err) throw err;
            //se tiver erro o expomos
            resultado.affectedRows == 0 ?
                responderSemSucesso(404, 'Usuario nao existente') :
                responderComSucesso(204, '', 'Usuario deletado com sucesso')
            //se nao houver erro realizamos uma operacao ternaria em cima dos
            //resultados se nem uma linha da tabela tiver sido afetada
            //e porque nao havia usuario e respondemos com erro
            //se uma linha tiver sido afetada, respondemos com sucesso
        })
    }


    inserirNaTabela = (dadosDoUsuario, responderComSucesso, responderSemSucesso) => {
        //inserir na tabela e o metodo utlizado pelo vero post
        let { nome, mail, telefone } = dadosDoUsuario
        //os dados estao em formato de objeto, entao
        //desestruturamos os campos em variaveis de nome equivalente
        //que conte os valores dos campos nome, mail, telefone
        let query = `INSERT INTO ${this.nomeDoBancoDeDados}.${this.nomeDaTabela}
            (nome, mail, telefone)
            VALUES ('${nome}', '${mail}', '${telefone}')`
        //montamos nossa query

        this.conexao.query(query, (err, resultado) => {
            //realizamos nossa quey
            if (err) throw err;
            //se houver algum erro
            //o expomos
        })
        //se tudo tiver ocrrido bem, respondemos com sucesso
        responderComSucesso(201, `${nome}, ${mail}, ${telefone}`, 'Armazenados com sucesso')
    }


    atualizarNaTabela = (id = null, dadosDoUsuario, responderComSucesso, responderSemSucesso) => {
        //atualizar na tabela e o metodo utilizado pelo verbo put
        //embora o id tenha um valor padrao de null
        //nao havera valor nulo nele quando a funcao for chamada
        //pois se o id nao fosse um numero valido
        //a nossa filtragem anterior em em analisarRequisicao ja
        //tera respondido sem sucesso
        let oqueAtualizar = ''
        //inicializamos uma variavel para saber quais campos do usuario devemos atualizar
        for (let key in dadosDoUsuario) {
            //como os dados do usuario sao um objeto contendo
            //as propriedades a ser atualizadas
            oqueAtualizar = oqueAtualizar + ` ${key}='${dadosDoUsuario[key]}',`
            //iteramos sobre esse objeto e montamos uma string
            //com o que o nome do campo que dever ser atualizado -> key
            //e o valor do conteudo a ser atualizado dadosDoUsuario[key]
            //concatenamos o resultado a oque atualizar
        }
        oqueAtualizar = oqueAtualizar.replace(/(,(?!\s))/gi, '')
        //como estamos colocando uma virgula no final ',' depois de cada iteracao
        //em oque atualizar, isso gera um erro de querry porque teriamos uma virgula
        //e nem um campo e um valor no final da string, apenas uma virgula
        //entao utilizamos uma expressao regular para retirar essa exata virgula
        //a expressao vao prucurar a unica virgula que contem somente espacos em brancos depois
        //dela e a retirar
        let query = `UPDATE ${this.nomeDoBancoDeDados}.${this.nomeDaTabela} 
            SET ${oqueAtualizar} 
            WHERE id = ${id}`
        //finalmente montamos nossa query completa
        this.conexao.query(query, (err, resultado) => {
            //realizamos a query com a conexa
            if (err) throw err;
            //se houver erro estouramos o mesmo
            resultado.affectedRows == 0 ?
                responderSemSucesso(404, 'Usuario nao existente') :
                responderComSucesso(204, '', 'Informacoes do usuario atualizadas com sucesso')
            //realizamos uma operacao ternaria
            //se nem uma linha tiver sido afetada no resultado
            //e porque o usuario nao existe, respondemos sem sucesso
            //senao respondemos com sucesso
        })
    }


}



module.exports = CRUD
//exportamos noss crud
