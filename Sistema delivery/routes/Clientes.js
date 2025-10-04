// routes/clientes.js
const express = require('express')
const router = express.Router()

// Simulação de "banco de dados" em memória
let clientes = [
  { id: 1, nome: "João Silva", email: "joao@email.com" },
  { id: 2, nome: "Maria Souza", email: "maria@email.com" }
];

// Listar todos os clientes
router.get('/', (req, res) => {
  res.status(200).json(clientes);
});

// Buscar cliente por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ mensagem: "ID inválido" });

  const clientes = clientes.find(c => c.id === id);
  if (!clientes) return res.status(404).json({ mensagem: "Cliente não encontrado." });

  res.status(200).json(clientes);
});

// Criar novo cliente
router.post('/', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });
  }

  const novoclientes = {
    id: clientes.length ? clientes[clientes.length - 1].id + 1 : 1,
    nome: nome.trim(),
    email: email.trim()
  };

  clientes.push(novoclientes);
  res.status(201).json(novoclientes);
});

// Atualizar cliente existente
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ mensagem: "ID inválido" });

  const clientesIndex = clientes.findIndex(c => c.id === id);
  if (clientesIndex === -1) return res.status(404).json({ mensagem: "Cliente não encontrado." });

  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ mensagem: "Nome e email são obrigatórios." });

  clientes[clientesIndex] = { id, nome: nome.trim(), email: email.trim() };
  res.status(200).json(clientes[clientesIndex]);
});

// Remover cliente
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ mensagem: "ID inválido" });

  const clientesIndex = clientes.findIndex(c => c.id === id);
  if (clientesIndex === -1) return res.status(404).json({ mensagem: "Cliente não encontrado." });

  const removido = clientes.splice(clientesIndex, 1)[0];
  res.status(200).json({ mensagem: "Cliente removido com sucesso.", clientes: removido });
});

module.exports = router;

