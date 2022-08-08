const express = require('express');
const sequelize = require('./config/db');
const router = require('./routes/index');

const app = express()

app.use('/api', router);

const port = process.env.PORT | 4000;

try {
    sequelize.authenticate().then(() => {
        console.log('Connected to DB');
    });
} catch (error) {
    console.error('DB connection error:', error);
}

app.listen(port, () => {
    console.log('Server running at port:', port);
})