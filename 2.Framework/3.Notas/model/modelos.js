// Neste arquivo serão definidos todos os modelos de dados da aplicação
class Nota {
  chave;
  titulo;
  texto;
  
  constructor(chave, titulo, texto) {
    this.chave = chave;
    this.titulo = titulo;
    this.texto = texto;
  }
  get chave() {
    return this.chave;
  }
  get titulo() {
    return this.titulo;
  }
  get texto() {
    return this.texto;
  }
  set titulo(novoTitulo) {
    this.titulo = novoTitulo;
  }
  set texto(novoTextp) {
    this.texto = novoTextp;
  }

}
module.exports = Nota;
