require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const models = require('./models')
const sequelize = require('./db')
const router = require('./routes/index')

const app = express();
app.use(express.json())
app.use(cors());
app.use('/api', router)


// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: '1234',
//     port: 5432,
// });

// app.get('/api/tovar', async (req, res) => {
//     try {
//       const result = await sequelize.query('SELECT * FROM tovar');
//       res.json(result.rows);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Ошибка сервера');
//     }
// });

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()