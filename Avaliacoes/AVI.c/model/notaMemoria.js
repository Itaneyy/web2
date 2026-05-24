// importação da classe Atividade no arquivo "modelos.js"
var Atividade = require("./modelos.js");

const lista_atividades = []; //será um vetor de objetos do tipo Atividade
var id = 0;

class AtividadeMemoria {
  async atualiza(id, titulo, desc, prioridade) {
    lista_atividades[id] = new Atividade(titulo, desc, prioridade);
    lista_atividades[id].id = id;
    return lista_atividades[id];
  }

  async cria(titulo, desc, prioridade) {
    // Criamos a atividade
    var novaAtividade = new Atividade(titulo, desc, prioridade);
    // IMPORTANTE: Adicionamos o id ao objeto para que o .hbs consiga ler {{id}}
    novaAtividade.id = id;

    lista_atividades[id] = novaAtividade;
    var estado = id;
    id++;
    return lista_atividades[estado];
  }

  async consulta(id) {
    if (lista_atividades[id]) return lista_atividades[id];
    else throw new Error(`Atividade com o id ${id} não existe`);
  }

  async deleta(id) {
    if (lista_atividades[id]) {
      delete lista_atividades[id];
    } else throw new Error(`Atividade com a id ${id} não existe`);
  }

  async lista() {
    // Retorna os valores do array (ignora os índices vazios/deletados)
    return Object.values(lista_atividades);
  }

  async lista_chaves() {
    return Object.keys(lista_atividades);
  }

  async qtd() {
    return lista_atividades.length;
  }
 
}


var banco = new AtividadeMemoria();
module.exports = banco;
