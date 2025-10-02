const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// TODO: Restaurante - Importar e mapear
const  = require('./routes/');
app.use();

// TODO: Pratos - Importar e mapear
const  = require('./routes/');
app.use();

// TODO: Clientes - Importar e mapear
const clientesRoutes = require('./routes/cliente');
app.use(clientesRoutes);

// TODO: Pedidos - Importar e mapear
const  = require('./routes/');
app.use();

// TODO: Entregadores - Importar e mapear
const  = require('./routes/');
app.use();

// TODO: Pagamentos - Importar e mapear
const  = require('./routes/');
app.use();

app.listen(3000, () => {
console.log(`Servidor rodando em http://localhost:3000`);
})


