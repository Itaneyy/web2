class Atividade {

  constructor(id, titulo, descricao, prioridade) {

    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.prioridade = prioridade;
    this.dataCriacao = new Date();
  }

}

module.exports = Atividade;