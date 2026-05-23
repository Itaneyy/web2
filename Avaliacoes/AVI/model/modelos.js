class Atividade {
  id;
  titulo;
  descricao;
  prioridade;
  dataCriacao;
  constructor(titulo, descricao, prioridade) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.prioridade = prioridade;

    const hoje = new Date().toLocaleDateString("pt-BR");
    this.dataCriacao = hoje;
  }
  get titulo() {
    return this.titulo;
  }
  set titulo(titulo) {
    this.titulo = titulo;
  }
  get descricao() {
    return this.descricao;
  }
  set descricao(descricao) {
    this.descricao = descricao;
  }
  get prioridade() {
    return this.prioridade;
  }
  set prioridade(prioridade) {
    this.prioridade = prioridade;
  }
}
module.exports = Atividade;
