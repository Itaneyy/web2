class Atividade{
    id = 1 
    titulo
    descricao
    prioridade
    dataCriacao

    constructor (id, titulo, descricao, prioridade) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.dataCriacao = new Date();
    }
    set id(id){
        this.id = id;
    }
    get id(){
        return this.id;
    }
    set titulo(titulo){
        this.titulo = titulo;
    }
    get titulo(){
        return this.titulo;
    }
    set descricao(descricao){
        this.descricao = descricao;
    }
    get descricao(){
        return this.descricao
    }
    set prioridade(prioridade){
        this.prioridade = this.prioridade;
    }
    get prioridade(){
        return this.prioridade;
    }
    set dataCriacao(dataCriacao){
        this.dataCriacao = dataCriacao;
    }
    get dataCriacao(){
        return this.dataCriacao
    }
    
}
module.exports = Atividade