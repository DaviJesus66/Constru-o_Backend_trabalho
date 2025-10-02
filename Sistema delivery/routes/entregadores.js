const express = require('express')
const router = express.Router()

// Array em memória com alguns entregadores
let nextId = 3
const entregadores = [
  {
    id: 1,
    nome: "Carlos Mendes",
    cpf: "12345678900",
    email: "carlos.mendes@example.com",
    telefone: "11999990010",
    placaVeiculo: "ABC1D23",
    tipoVeiculo: "Moto"
  },
  {
    id: 2,
    nome: "Juliana Rocha",
    cpf: "98765432100",
    email: "juliana.rocha@example.com",
    telefone: "11999990011",
    placaVeiculo: "XYZ4E56",
    tipoVeiculo: "Bicicleta"
  }
]

// Validação de campos obrigatórios
function validarEntregador(body) {
  const obrigatorios = ['nome', 'cpf', 'email', 'telefone', 'placaVeiculo', 'tipoVeiculo']
  for (const campo of obrigatorios) {
    if (!body[campo] || String(body[campo]).trim() === '') {
      return { ok: false, message: `Campo obrigatório: ${campo}` }
    }
  }
  return { ok: true }
}

// Verifica duplicação de CPF ou email
function existeDuplicado(campo, valor, ignoreId = null) {
  return entregadores.some(e => e[campo] === valor && e.id !== ignoreId)
}

// --- ENDPOINTS --- //

// GET /entregadores → listar todos
router.get('/', (req, res) => {
  res.json(entregadores)
})

// GET /entregadores/:id → buscar por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const entregador = entregadores.find(e => e.id === id)
  if (!entregador) return res.status(404).json({ error: 'Entregador não encontrado' })
  res.json(entregador)
})

// POST /entregadores → criar novo
router.post('/', (req, res) => {
  const body = req.body
  const v = validarEntregador(body)
  if (!v.ok) return res.status(400).json({ error: v.message })

  if (existeDuplicado('cpf', body.cpf)) {
    return res.status(409).json({ error: 'CPF já cadastrado' })
  }
  if (existeDuplicado('email', body.email)) {
    return res.status(409).json({ error: 'Email já cadastrado' })
  }

  const novo = {
    id: nextId++,
    nome: body.nome.trim(),
    cpf: body.cpf.trim(),
    email: body.email.trim(),
    telefone: body.telefone.trim(),
    placaVeiculo: body.placaVeiculo.trim(),
    tipoVeiculo: body.tipoVeiculo.trim()
  }

  entregadores.push(novo)
  res.status(201).json(novo)
})

// PUT /entregadores/:id → atualizar
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = entregadores.findIndex(e => e.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Entregador não encontrado' })

  const body = req.body
  const v = validarEntregador(body)
  if (!v.ok) return res.status(400).json({ error: v.message })

  if (existeDuplicado('cpf', body.cpf, id)) {
    return res.status(409).json({ error: 'CPF já cadastrado' })
  }
  if (existeDuplicado('email', body.email, id)) {
    return res.status(409).json({ error: 'Email já cadastrado' })
  }

  const atualizado = {
    id,
    nome: body.nome.trim(),
    cpf: body.cpf.trim(),
    email: body.email.trim(),
    telefone: body.telefone.trim(),
    placaVeiculo: body.placaVeiculo.trim(),
    tipoVeiculo: body.tipoVeiculo.trim()
  }

  entregadores[idx] = atualizado
  res.json(atualizado)
})

// DELETE /entregadores/:id → deletar
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = entregadores.findIndex(e => e.id === id)
  if (idx === -1) return res.status(404).json({ error: 'Entregador não encontrado' })

  const removido = entregadores.splice(idx, 1)[0]
  res.json({ message: 'Entregador removido', entregador: removido })
})

module.exports = router