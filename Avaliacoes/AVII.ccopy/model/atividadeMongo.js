var Atividade = require("./modelos.js");
const mongodb = require("mongodb");

const ClienteMongo = mongodb.MongoClient;

var cliente;

const conexao_bd = async () => {
  if (!cliente) {
    cliente = await ClienteMongo.connect(
      "mongodb://127.0.0.1:27017"
    );

    console.log("MongoDB conectado com sucesso.");
  }
};

const bd = () => {
  return cliente.db("gerenciadorAtividades");
};

class AtividadeMongo {

  async close() {
    if (cliente) cliente.close();
    cliente = undefined;
  }

  async criar(titulo, descricao, prioridade) {

    await conexao_bd();

    const colecao = bd().collection("atividades");

    const atividade = {
      titulo,
      descricao,
      prioridade,
      dataCriacao: new Date()
    };

    const resultado = await colecao.insertOne(atividade);

    atividade._id = resultado.insertedId;

    return atividade;
  }

  async consultar(id) {

    await conexao_bd();

    const colecao = bd().collection("atividades");

    const atividade = await colecao.findOne({
      _id: new mongodb.ObjectId(id)
    });

    if (!atividade)
      throw new Error(`Atividade com ID ${id} não encontrada`);

    return atividade;
  }

  async deletar(id) {

    await conexao_bd();

    const colecao = bd().collection("atividades");

    const atividade = await colecao.findOne({
      _id: new mongodb.ObjectId(id)
    });

    if (!atividade)
      throw new Error(`Atividade com ID ${id} não encontrada`);

    await colecao.deleteOne({
      _id: new mongodb.ObjectId(id)
    });
  }

  async atualizar(id, titulo, descricao, prioridade) {

    await conexao_bd();

    const colecao = bd().collection("atividades");

    await colecao.updateOne(
      {
        _id: new mongodb.ObjectId(id)
      },
      {
        $set: {
          titulo,
          descricao,
          prioridade
        }
      }
    );
  }

  async lista() {

    await conexao_bd();

    const colecao = bd().collection("atividades");

    return await colecao.find({}).toArray();
  }

  async listaAlta() {

    await conexao_bd();

    const colecao = bd().collection("atividades");

    return await colecao.find({
      prioridade: "Alta"
    }).toArray();
  }
}

module.exports = new AtividadeMongo();