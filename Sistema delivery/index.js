const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// TODO: Membro - Importar e mapear
const clientesRoutes = require('./clientesRoutes');
app.use(clientesRoutes);

const entregadoresRoutes = require('./entregadoresRoutes')
app.use(entregadoresRoutes);

const pagamentosRoutes = require('./pagamentosRoutes')
app.use(pagamentosRoutes);

const pratosRoutes = require('./pratosRoutes')
app.use(pratosRoutes);

const restaurantesRoutes = require('./routes/restaurantesRoutes');
app.use(restaurantesRoutes);

app.listen(3000, () => {
console.log(`Servidor rodando em http://localhost:3000`);
})
