const express = require('express')
const router = express.Router()

// Simulação de base de dados em memória
let nextId = 3
const restaurantes = [
  {
    id: 1,
    nome: "Pizzaria Napoli",
    cnpj: "12345678000101",
    telefone: "11999990001",
    endereco: "Rua das Flores, 123",
    tipoCozinha: "Italiana"
  },
  {
    id: 2,
    nome: "Sushi Yama",
    cnpj: "98765432000199",
    telefone: "11999990002",
    endereco: "Av. Japão, 456",
    tipoCozinha: "Japonesa"
  }
]

// Validação básica de campos obrigatórios
function validarRestaurante(body) {
  const obrigatorios = ['nome', 'cnpj', 'telefone', 'endereco', 'tipoCozinha']
  for (const campo of obrigatorios) {
    if (!body[campo] || String(body[campo]).trim() === '') {
      return { ok: false, message: `Campo obrigatório: ${campo}` }
    }
  }

  // validação simples de CNPJ (14 dígitos)
  if (!/^\d{14}$/.test(body.cnpj)) {
    return { ok: false, message: "CNPJ inválido (precisa ter 14 dígitos)" }
  }

  return { ok: true }
}

// Verifica duplicação de CNPJ ou nome
function existeDuplicado(campo, valor, ignoreId = null) {
  const normalizado = String(valor).trim().toLowerCase()
  return restaurantes.some(r =>
    String(r[campo]).trim().toLowerCase() === normalizado && r.id !== ignoreId
  )
}

// listar todos
router.get('/', (req, res) => {
  res.json(restaurantes)
})

// buscar por ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const restaurante = restaurantes.find(r => r.id === id)
  if (!restaurante) return res.status(404).json({ erro: 'Restaurante não encontrado' })
  res.json(restaurante)
})

// criar novo
router.post('/', (req, res) => {
  const body = req.body
  const v = validarRestaurante(body)
  if (!v.ok) return res.status(400).json({ erro: v.message })

  if (existeDuplicado('cnpj', body.cnpj)) {
    return res.status(409).json({ erro: 'CNPJ já cadastrado' })
  }
  if (existeDuplicado('nome', body.nome)) {
    return res.status(409).json({ erro: 'Nome já cadastrado' })
  }

  const novo = {
    id: nextId++,
    nome: body.nome.trim(),
    cnpj: body.cnpj.trim(),
    telefone: body.telefone.trim(),
    endereco: body.endereco.trim(),
    tipoCozinha: body.tipoCozinha.trim()
  }

  restaurantes.push(novo)
  res.status(201).json(novo)
})

// atualizar
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = restaurantes.findIndex(r => r.id === id)
  if (idx === -1) return res.status(404).json({ erro: 'Restaurante não encontrado' })

  const body = req.body
  const v = validarRestaurante(body)
  if (!v.ok) return res.status(400).json({ erro: v.message })

  if (existeDuplicado('cnpj', body.cnpj, id)) {
    return res.status(409).json({ erro: 'CNPJ já cadastrado' })
  }
  if (existeDuplicado('nome', body.nome, id)) {
    return res.status(409).json({ erro: 'Nome já cadastrado' })
  }

  const atualizado = {
    id,
    nome: body.nome.trim(),
    cnpj: body.cnpj.trim(),
    telefone: body.telefone.trim(),
    endereco: body.endereco.trim(),
    tipoCozinha: body.tipoCozinha.trim()
  }

  restaurantes[idx] = atualizado
  res.json(atualizado)
})

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = restaurantes.findIndex(r => r.id === id)
  if (idx === -1) return res.status(404).json({ erro: 'Restaurante não encontrado' })

  const removido = restaurantes.splice(idx, 1)[0]
  res.json({ mensagem: 'Restaurante removido com sucesso', restaurante: removido })
})

module.exports = router
