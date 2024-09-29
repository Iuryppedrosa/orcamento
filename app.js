class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor, id) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
    this.id = id;
  }

  valirdarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");
    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }
  getProximoId() {
    let proximoId = localStorage.getItem("id");
    proximoId = parseInt(proximoId) + 1;
    return proximoId;
  }
  gravar(d) {
    let id = this.getProximoId();
    localStorage.setItem("id", JSON.stringify(d));
  }
}
let bd = new Bd();
function cadastrarDespesa() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;
  valor = parseFloat(valor);
  let id = Math.floor(Math.random() * (100 * 1000)) + 1;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor, id);

  if (!despesa.valirdarDados()) {
    document.getElementById(
      "modal_title"
    ).innerHTML = `Erro ao gravar a despesa ${despesa.id}`;
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_conteudo").innerHTML =
      "Existem campos obrigatórios que não foram preenchidos";
    document.getElementById("modal_btn").className = "btn btn-danger";
    $("#modalAlerta").modal("show");
  } else {
    document.getElementById(
      "modal_title"
    ).innerHTML = `Registro inserido de id ${despesa.id} com sucesso`;
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso";
    document.getElementById("modal_btn").className = "btn btn-success";
    $("#modalAlerta").modal("show");
  }
  bd.gravar(despesa);
}
