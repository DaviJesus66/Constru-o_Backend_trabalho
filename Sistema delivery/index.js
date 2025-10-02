const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// TODO: Membro 1 - Importar e mapear
const restaurantRoutes = require('./routes/restaurantRoutes');
app.use('/restaurants', restaurantRoutes);

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


