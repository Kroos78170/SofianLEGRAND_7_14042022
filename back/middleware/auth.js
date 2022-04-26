const connectdb = require('../connectdb');
const mysql = require('mysql2');
const User = require("../mods/user");
require('dotenv').config();
const user = new User()
module.exports = (req, res, next) => {
    try {
        const userId = user.getUserIdToken(req.headers.authorization)
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(id) as count FROM user WHERE id=?';
        sql = mysql.format(sql, sqlInserts);
        connectdb.query(sql, function(error, result) {
            if (error) throw new Error('Error SQL');
            console.log(result)
            if (result[0]['count'] !== 1) {
                throw new Error('Token invalide');
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(401).json({ error: error.message | 'Requête non authentifiée!' })
    }
};