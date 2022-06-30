const connectdb = require('../connectdb');
const mysql = require('mysql2');
const tools = require('../utilities/tools');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const userId = tools.getUserIdToken(req.headers.authorization)
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(moderation) as count FROM user WHERE id=?';
        sql = mysql.format(sql, sqlInserts);
        connectdb.query(sql, function(error, result) {
            if (error) throw new Error('Error SQL');
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