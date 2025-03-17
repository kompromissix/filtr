require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const models = require('./models')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});

app.get('/api/tovar', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tovar');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Ошибка сервера');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});