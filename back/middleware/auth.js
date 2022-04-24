const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb');
const mysql = require('mysql');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'process.env.USER_TOKEN');
        const userId = decodedToken.userId;
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(id) FROM users WHERE id=?';
        sql = mysql.format(sql, sqlInserts);
        connectdb.query(sql, function(error, result) {
            if (error) reject({ error: 'Erreur dans l\'inscription' });
            if (result[0]['COUNT(id)'] !== 1) {
                throw 'Token invalide';
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée!' })
    }
};