// routes/pratos.js
const express = require("express");
const router = express.Router();

let pratos = require("../data/pratos");
const restaurantes = require("../data/restaurantes");

// helper: próximo id (robusto contra remoções)
function getNextId() {
  return pratos.length ? Math.max(...pratos.map(p => p.id)) + 1 : 1;
}

// validação comum para POST/PUT
function validarPrato(body) {
  const { nome, preco, idRestaurante } = body;
  if (!nome || preco === undefined || idRestaurante === undefined) {
    return { ok: false, mensagem: "Campos obrigatórios: nome, preco, idRestaurante" };
  }

  const precoNum = Number(preco);
  if (!isFinite(precoNum) || precoNum <= 0) {
    return { ok: false, mensagem: "Campo 'preco' deve ser um número maior que 0" };
  }

  const rest = restaurantes.find(r => r.id === Number(idRestaurante));
  if (!rest) {
    return { ok: false, mensagem: "idRestaurante inválido (restaurante não encontrado)" };
  }

  return {
    ok: true,
    prato: {
      nome: String(nome),
      preco: precoNum,
      descricao: body.descricao ? String(body.descricao) : "",
      idRestaurante: Number(idRestaurante)
    }
  };
}

/** CREATE */
router.post("/", (req, res) => {
  const v = validarPrato(req.body);
  if (!v.ok) return res.status(400).json({ erro: v.mensagem });

  const novo = { id: getNextId(), ...v.prato };
  pratos.push(novo);
  return res.status(201).json(novo);
});

/** READ ALL */
router.get("/", (req, res) => {
  res.json(pratos);
});

/** READ by ID */
router.get("/:id", (req, res) => {
  const prato = pratos.find(p => p.id === Number(req.params.id));
  if (!prato) return res.status(404).json({ erro: "Prato não encontrado" });
  res.json(prato);
});

/** UPDATE (substituição completa) */
router.put("/:id", (req, res) => {
  const idx = pratos.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ erro: "Prato não encontrado" });

  const v = validarPrato(req.body);
  if (!v.ok) return res.status(400).json({ erro: v.mensagem });

  const atualizado = { id: Number(req.params.id), ...v.prato };
  pratos[idx] = atualizado;

  res.json(atualizado);
});

/** DELETE */
router.delete("/:id", (req, res) => {
  const idx = pratos.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ erro: "Prato não encontrado" });

  const removido = pratos.splice(idx, 1)[0];
  res.json({ mensagem: "Prato removido com sucesso", prato: removido });
});

module.exports = router;

