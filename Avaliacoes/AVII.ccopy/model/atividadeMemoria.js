var Atividade = require('./modelos.js')

const lista_atividades = [];
const listaAltaPrio = [];
var proximoID = 1;

class AtividadeMemoria{
    async criar(titulo, descricao, prioridade){
        
        lista_atividades[proximoID] = new Atividade(proximoID, titulo, descricao, prioridade);
        proximoID++;
        return lista_atividades[proximoID-1];
        
    }
    async consultar(id){
        if(lista_atividades[id])
            return lista_atividades[id]
        else
            throw new Error(`Atividade com o ID ${id} não existe`);
    }
    async deletar(id){
       if(lista_atividades[id])
            delete lista_atividades[id]
        else
            throw new Error(`Atividade com o ID ${id} não existe`);
    }
    
    async lista() {
return lista_atividades
}
async listaAlta() {
    let listaAltaPrio = [];

    for (let i = 0; i < lista_atividades.length; i++) {
        if (lista_atividades[i] &&
            lista_atividades[i].prioridade == "Alta") {

            listaAltaPrio.push(lista_atividades[i]);
        }
    }

    return listaAltaPrio;
}

}
var atividades = new AtividadeMemoria()
module.exports = atividades