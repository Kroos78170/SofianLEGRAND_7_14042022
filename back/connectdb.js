const mysql = require('mysql2');
require('dotenv').config();

const connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

connexion.connect(error => {
    if (error) throw error;
    console.log('Connexion à la base de données réussie !')
});

module.exports = connexion;