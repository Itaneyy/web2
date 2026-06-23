var Nota = require("./modelos.js");
const mongodb = require("mongodb");
// cria uma instância do cliente do mongo
const ClienteMongo = mongodb.MongoClient;
var cliente;

// estabelece conexão com o Banco de Dados
const conexao_bd = async () => {
  if (!cliente) {
    // 1. Conecta ao servidor MongoDB
    cliente = await ClienteMongo.connect("mongodb://127.0.0.1:27017");

    // 2. Garante que o índice de texto seja criado assim que conectar
    const colecao = bd().collection("notas");
    await colecao.createIndex({ titulo: "text" });
    console.log(
      "-> Conectado ao MongoDB e índice 'text' garantido com sucesso!",
    );
  }
};

// retorna o referência para o banco de dados da aplicação
const bd = () => {
  return cliente.db("notas");
};

class NotaMongo {
  async close() {
    if (cliente) cliente.close();
    cliente = undefined;
  }

  async atualiza(nota) {
    await conexao_bd();
    const colecao = bd().collection("notas");
    await colecao.updateOne(
      { chave: nota.chave },
      {
        $set: {
          titulo: nota.titulo,
          texto: nota.texto,
          importancia: nota.importancia,
          lida: nota.lida,
        },
      },
    );
  }
  // Exemplo de função a ter no seu notaMongo.js
  async filtrar(condicoes) {
    const colecao = bd().collection("notas");
    // Passa o objeto dinâmico gerado no controller diretamente para o find() do Mongo [cite: 53, 120]
    return await colecao.find(condicoes).toArray();
  }

  async cria(nota) {
    await conexao_bd();
    const colecao = bd().collection("notas");
    nota.lida = false; //toda nota deve ser criada como não lida
    await colecao.insertOne(nota);
  }

  async consulta(chave) {
    await conexao_bd();
    const colecao = bd().collection("notas");
    const nota = await colecao.findOne({ chave: chave });
    return nota;
  }

  async deleta(chave) {
    await conexao_bd();
    const colecao = bd().collection("notas");
    const doc = await colecao.findOne({ chave: chave });
    if (!doc) {
      throw new Error(`Não existe a nota com chave: ${chave}`);
    } else {
      await colecao.findOneAndDelete({ chave: chave });
    }
  }

  async lista() {
    await conexao_bd();
    const colecao = bd().collection("notas");
    var notas = await colecao.find({}).toArray();
    return notas;
  }

  async lista_chaves() {
    await conexao_bd();
    const colecao = bd().collection("notas");
    var chaves = [];
    await colecao
      .find({}, { projection: { _id: 0, chave: 1 } })
      .forEach((nota) => {
        chaves.push(nota.chave);
      });
    return chaves;
  }

  async qtd() {
    await conexao_bd();
    const colecao = bd().collection("notas");
    const qtd = await colecao.count({});
    return qtd;
  }

  async query(obj) {
    await conexao_bd();
    const colecao = bd().collection("notas");

    // Executa a busca textual diretamente
    var notas = await colecao.find({ $text: { $search: obj } }).toArray();
    return notas;
  }
}
module.exports = new NotaMongo();
