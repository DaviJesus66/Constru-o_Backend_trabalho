// Criação de clientes

const express = require('express')
const router = express.Router()

app.use(express.json());

// Simulação de "banco de dados" em memória
let clientes = [
  { id: 1, nome: "João Silva",
    email: "joao@email.com"
},
  { id: 2, nome: "Maria Souza",
    email: "maria@email.com"
}
];

//Listar todos os clientes
app.get('/clientes', (req, res) => {
  res.status(200).json(clientes);
});

//Buscar cliente por ID
app.get('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);

  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  res.status(200).json(cliente);
});

//Criar novo cliente
app.post('/clientes', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });
  }

  const novoCliente = {
    id: clientes.length ? clientes[clientes.length - 1].id + 1 : 1,
    nome,
    email
  };

  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// PUT - Atualizar cliente existente
app.put('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;
  const clienteIndex = clientes.findIndex(c => c.id === id);

  if (clienteIndex === -1) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });
  }

  clientes[clienteIndex] = { id, nome, email };
  res.status(200).json(clientes[clienteIndex]);
});

//Remover cliente
app.delete('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex(c => c.id === id);

  if (clienteIndex === -1) {
    return res.status(404).json({ mensagem: "Cliente não encontrado." });
  }

  clientes.splice(clienteIndex, 1);
  res.status(200).json({ mensagem: "Cliente removido com sucesso." });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// exportar o roteador
module.exports = router