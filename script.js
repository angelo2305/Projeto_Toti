//console.log("Projeto Turma 48");
document.getElementById("enviar").setAttribute("disabled", true);

document.getElementById("enviar").removeAttribute("disabled");

//validacão name
document.getElementById("name").addEventListener("input", function (e) {
  const nome = e.target.value;
  const nomeIsValid = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome); // Apenas letras e espaços
  if (!nomeIsValid) {
      e.target.value = nome.slice(0, -1);
      showError("Nome deve conter apenas letras.");
  } else {
      hideError();
  }
  ativaDesativaEnviar(verificarCampos());
});

//validacão de cpf
document.getElementById("cpf").addEventListener("input", function (e) {
  const input = e.target.value;
  const cpfIsValid = /^[0-9]*$/.test(input);
  if (!cpfIsValid) {
    e.target.value = input.slice(0, -1);
    document.getElementById("cpf-erro-message").style.display = "block";
  } else {
    document.getElementById("cpf-erro-message").style.display = "none";
  }
});

//mascara do cpf
document.getElementById("cpf").addEventListener("change", function (e) {
  e.target.value = mascararCPF(e.target.value);
  /*validarCPF(e.target.value) === true
    ? document.getElementById("enviar").removeAttribute("disabled")
    : document.getElementById("enviar").setAttribute("disabled", true);*/
  ativaDesativaEnviar(validarCPF(e.target.value));
});

document.getElementById("prova1").addEventListener("change", function (e) {
  ativaDesativaEnviar(validarNumero(e.target.value));
});
document.getElementById("prova2").addEventListener("change", function (e) {
  ativaDesativaEnviar(validarNumero(e.target.value));
});


document.getElementById("email").addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});
document.getElementById("telefone").addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
  e.target.value = mascaraTelefone(e.target.value);
  ativaDesativaEnviar(validarTelefone(e.target.value));
});
document.getElementById("cidade").addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});
document.getElementById("estado").addEventListener("change", function (e) {
  ativaDesativaEnviar(validarVazio(e.target.value));
});

const students = [];

class Studant {
  constructor(
    nome,
    cpf,
    nascimento,
    email,
    telefone,
    pais,
    estado,
    cidade,
    prova1,
    prova2
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.nascimento = nascimento;
    this.email = email;
    this.telefone = telefone;
    this.pais = pais;
    this.estado = estado;
    this.cidade = cidade;
    this.prova1 = prova1;
    this.prova2 = prova2;
    this.media = (prova1 + prova2) / 2;
    this.situacao = this.media >= 5 ? "aprovado" : "reprovado";
  }

  exibeDados() {
    return `O Aluno ${this.nome} tirou nota ${this.prova} na P1 e ${
      this.prova2
    } na P2. Sua média é: ${this.media.toString().replace(".", ",")} e esta ${
      this.situacao
    }`;
  }
}

function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) return false;

  // Elimina CPFs conhecidos como inválidos
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Valida os dígitos verificadores
  for (let t = 9; t < 11; t++) {
    let d = 0;
    for (let i = 0; i < t; i++) {
      d += cpf[i] * (t + 1 - i);
    }
    d = ((10 * d) % 11) % 10;
    if (cpf[t] != d) return false;
  }

  return true;
}
/*Funções de validação*/
function validarNumero(numero) {
  // Verifica se o número está entre 0 e 10
  if (numero >= 0 && numero <= 10) {
    return true;
  } else {
    return false;
  }
}
function validarVazio(campo) {
  // Verifica se o campo não está vazio
  if (campo.trim() !== "") {
    return true;
  } else {
    return false;
  }
}

function validarTelefone(telefone) {
  // Remove caracteres não numéricos
  telefone = telefone.replace(/[^\d]+/g, "");

  // Verifica se o telefone tem 10 ou 11 dígitos
  if (telefone.length === 10 || telefone.length === 11) {
    // Verifica se os dois primeiros dígitos são válidos (DDD)
    const ddd = telefone.substring(0, 2);
    if (/^\d{2}$/.test(ddd)) {
      // Verifica se o número de telefone é válido
      const numero = telefone.substring(2);
      if (/^\d{8}$/.test(numero) || /^\d{9}$/.test(numero)) {
        return true;
      }
    }
  }
  return false;
}
/* Função de ativar ou desativar botao de envio*/
function ativaDesativaEnviar(valor) {
  valor === true
    ? document.getElementById("enviar").removeAttribute("disabled")
    : document.getElementById("enviar").setAttribute("disabled", true);
}
/**Funções de máscara */
function mascararCPF(input) {
  input = input.replace(/(\d{3})(\d)/, "$1.$2");
  input = input.replace(/(\d{3})(\d)/, "$1.$2");
  input = input.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return input;
}
function mascaraTelefone(telefone) {
  // Remove caracteres não numéricos
  telefone = telefone.replace(/[^\d]+/g, "");

  // Verifica se o telefone tem 10 ou 11 dígitos
  if (telefone.length === 10) {
    // Formato para telefone com 8 dígitos
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else if (telefone.length === 11) {
    // Formato para telefone com 9 dígitos
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    // Retorna o telefone original se não tiver 10 ou 11 dígitos
    return telefone;
  }
}

/*Função de Envio do Formulário */
function enviarFormulario() {
  const nome = document.getElementById("name").value;
  const cpf = document.getElementById("cpf").value;
  const nascimento = document.getElementById("nascimento").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const pais = document.getElementById("pais").value;
  const estado = document.getElementById("estado").value;
  const cidade = document.getElementById("cidade").value;
  const prova1 = parseFloat(document.getElementById("prova1").value);
  const prova2 = parseFloat(document.getElementById("prova2").value);

  const student = new Studant(
    nome,
    cpf,
    nascimento,
    email,
    telefone,
    pais,
    estado,
    cidade,
    prova1,
    prova2
  );

  students.push(student);

  renderData();

  /**Renderiza tabela */
  function renderData() {
    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = "";

    students.forEach((student) => {
      const row = document.createElement("tr");

      Object.values(student).forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        studentTableBody.appendChild(cell);
      });
      studentTableBody.appendChild(row);
    });
  }
}

function exportaCSV() {
  const header = [
    "nome",
    "cpf",
    "nascimento",
    "email",
    "telefone",
    "pais",
    "estado",
    "cidade",
    "prova1",
    "prova2",
    "media",
    "situacao",
  ];

  const rows = students.map((studant) =>
    Object.values(studant)
      .map((value) => `"${value}"`)
      .join(";")
  );
  const csvContent = [header.join(";"), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;chaset=utf-8" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "lista_estudantes.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportaPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const header = [
    "Nome",
    "CPF",
    "Nascimento",
    "Email",
    "Telefone",
    "País",
    "Estado",
    "Cidade",
    "Prova 1",
    "Prova 2",
    "Média",
    "Situação",
  ];

  const rows = students.map((student) => Object.values(student));

  // Adiciona o título do documento
  doc.text("Lista de Estudantes", 14, 16);

  // Adiciona a tabela ao PDF
  doc.autoTable({
    head: [header],
    body: rows,
    startY: 20,
    styles: { fontSize: 8 },
  });

  // Salva o PDF
  doc.save("lista_estudantes.pdf");
}
