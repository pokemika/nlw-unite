
let participantes = [
  {
  nome: "Moana Brito",
  email: "moana@gmail.com",
  dataInscricao: new Date(2024, 2, 22, 19, 20), //ano, mês (março), dia, hr, min
  dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
 {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 1, 02, 19, 23),
    dataCheckIn: new Date(2024, 1, 05, 20, 20)
  },
  {
    nome: "Miriam",
    email: "miriam@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 10, 30),
    dataCheckIn: new Date(2024, 0, 12, 12, 45)
  },
  {
    nome: "Luiza Silva",
    email: "luiza@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 15, 15),
    dataCheckIn: new Date(2024, 2, 20, 18, 30)
  },
  {
    nome: "Viviane Pereira",
    email: "vivi@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 14, 45),
    dataCheckIn: null
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 05, 11, 00),
    dataCheckIn: new Date(2024, 0, 10, 09, 30)
  },
  {
    nome: "Pedro Lima",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 08, 30),
    dataCheckIn: null
  },
  {
    nome: "Mariana Santos",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 17, 20),
    dataCheckIn: new Date(2024, 3, 04, 19, 00)
  },
  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 13, 10),
    dataCheckIn: new Date(2024, 0, 18, 15, 30)
  },
  {
    nome: "Carla Mendes",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 10, 15),
    dataCheckIn: new Date(2024, 2, 15, 12, 00)
  }
];


const novoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `<tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
        </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>`
}

const atualizarLista = (participantes) => { 
  let output = "" 

  for (let participante of participantes) {
  	output = output + novoParticipante(participante)
  }

  // substituir info do HTML
  document.querySelector('tbody').innerHTML = output

}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

// verificar se participante já existe
const participanteExiste = participantes.find(
  (p) =>
  {
    return p.email == participante.email 
  }
)

if(participanteExiste) {
  alert("Email já cadastrado!")
  return
}

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se quer o check-in
  const msgConfirmacao = "Tem certeza que deseja fazer o check-in?"
  
  if(confirm(msgConfirmacao) == false) {
      return 
    }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email // é possível retirar as chaves e o return
  })

  // att o check-in do participante
  participante.dataCheckIn = new Date()

  // att a lista de participantes
  atualizarLista(participantes)
}