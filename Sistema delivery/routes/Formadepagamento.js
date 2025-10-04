const express = require("express");
const router = express.Router();

let pagamentos = [];
let idCounter = 1;

// GET - Listar todos
router.get("/", (req, res) => {
  res.json(pagamentos);
});

// GET - Buscar por ID
router.get("/:id", (req, res) => {
  const pagamento = pagamentos.find(p => p.id === parseInt(req.params.id, 10));
  if (!pagamento) {
    return res.status(404).json({ message: "Forma de pagamento não encontrada" });
  }
  res.json(pagamento);
});

// POST - Criar novo
router.post("/", (req, res) => {
  const { tipo, descricao, ativo } = req.body;

  if (!tipo || !descricao) {
    return res.status(400).json({ message: "Tipo e descrição são obrigatórios" });
  }

  const novoPagamento = {
    id: idCounter++,
    tipo,
    descricao,
    ativo: ativo ?? true
  };

  pagamentos.push(novoPagamento);
  res.status(201).json(novoPagamento);
});

// PUT - Atualizar existente
router.put("/:id", (req, res) => {
  const pagamento = pagamentos.find(p => p.id === parseInt(req.params.id, 10));
  if (!pagamento) {
    return res.status(404).json({ message: "Forma de pagamento não encontrada" });
  }

  const { tipo, descricao, ativo } = req.body;

  if (!tipo || !descricao) {
    return res.status(400).json({ message: "Tipo e descrição são obrigatórios" });
  }

  pagamento.tipo = tipo;
  pagamento.descricao = descricao;
  pagamento.ativo = ativo ?? pagamento.ativo; // mantém o valor anterior se não for enviado

  res.json(pagamento);
});

// DELETE - Remover
router.delete("/:id", (req, res) => {
  const index = pagamentos.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ message: "Forma de pagamento não encontrada" });
  }

  const removido = pagamentos.splice(index, 1)[0];
  res.json({ message: "Forma de pagamento removida", pagamento: removido });
});

module.exports = router;

