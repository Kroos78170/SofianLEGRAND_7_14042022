const connectdb = require('../connectdb.js');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()



class User {
    signup(sqlInserts) {
        let sql = 'INSERT INTO user VALUES(NULL, ?, ?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function(error, result) {
                if (error) reject({ error: 'Erreur dans l\'inscription' });
                resolve({ message: 'Nouvel utilisateur !' })
            })
        })
    };

    login(sqlInserts, password) {
        let sql = 'SELECT * FROM user WHERE email = ?';
        sql = mysql.format(sql, sqlInserts);

        return new Promise((resolve, reject) => {
            connectdb.query(sql, function(error, result) {
                if (error) reject({ error });
                if (!result[0]) {
                    reject({ error: 'Utilisateur introuvable !' });
                } else {
                    bcrypt.compare(password, result[0].password)
                        .then(valid => {
                            if (!valid) return reject({ error: 'Mot de passe incorrect !' });
                            resolve({
                                userId: result[0].id,
                                token: jwt.sign({
                                        userId: result[0].id,
                                        moderation: result[0].moderation
                                    },
                                    process.env.USER_TOKEN, { expiresIn: '24h' }
                                ),
                                moderation: result[0].moderation
                            });
                        })
                        .catch(error => reject({ error }));
                }
            })

        })
    };

    seeMyProfile(sqlInserts) {
        let sql = 'SELECT firstName, lastName, email FROM user WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function(error, result) {
                if (error) return reject({ error: 'page indisponible' });
                resolve(result[0]);
            })
        })
    };

    updateUser(sqlInserts) {
        let sql = 'UPDATE user SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function(error, result) {
                if (error) return reject({ error: 'fonction indisponible' });
                resolve({ message: 'Informations mises à jour !' });
            })
        })
    };

    deleteUser(sqlInserts) {
        let sql = 'DELETE FROM user WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function(error, result) {
                if (error) return reject({ error: 'fonction indisponible' });
                resolve({ message: 'Utilisateur supprimé' });
            })

        })

    };

    getUserIdToken(authorizationBearer) {
        const token = authorizationBearer.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
        return decodedToken.userId;
    }
};

module.exports = User;