class Atividade {
  id;
  titulo;
  descricao;
  prioridade;
  executada;
  dataCriacao;
  constructor(titulo, descricao, prioridade, executada = false) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.prioridade = prioridade;
    this.executada = executada;
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
  get executada() {
    return this.executada;
  }
  set executada(executada) {
    this.executada = executada;
  }
  set
}
module.exports = Atividade;
