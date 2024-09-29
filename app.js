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
    return parseInt(proximoId) + 1;
  }
  gravar(d) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() {
    let despesas = Array();
    let id = localStorage.getItem("id");
    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i));
      if (despesa === null) {
        continue;
      }
      despesa.id = i;
      despesas.push(despesa);
    }
    return despesas;
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
    limparCamposRegistro();
  } else {
    bd.gravar(despesa);
    document.getElementById(
      "modal_title"
    ).innerHTML = `Registro inserido de id ${despesa.id} com sucesso`;
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso";
    document.getElementById("modal_btn").className = "btn btn-success";
    $("#modalAlerta").modal("show");
    limparCamposRegistro();
  }
}

function limparCamposRegistro() {
  document.getElementById("ano").value = "";
  document.getElementById("mes").value = "";
  document.getElementById("dia").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

function carregaListaDespesas() {
  let despesas = Array();
  despesas = bd.recuperarTodosRegistros();

  let listaDespesas = document.getElementById("listaDespesas");
  despesas.forEach(function (d) {
    let linha = listaDespesas.insertRow();
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
    switch (d.tipo) {
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Educação";
        break;
      case "3":
        d.tipo = "Lazer";
        break;
      case "4":
        d.tipo = "Saúde";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo;
    linha.insertCell(2).innerHTML = d.descricao;
    linha.insertCell(3).innerHTML = d.valor;
  });
}
