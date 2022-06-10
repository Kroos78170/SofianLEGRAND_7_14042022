const connectdb = require('../connectdb.js');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()



class User {
    signup(sqlInserts) {
        let sql = 'INSERT INTO user VALUES(NULL, ?, ?, ?, ?, 0, NOW())';
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
                            return resolve({
                                user: {
                                    userId: result[0].id,
                                    fullName: result[0].firstname + ' ' + result[0].lastname,
                                    moderation: result[0].moderation
                                },

                                token: jwt.sign({
                                        userId: result[0].id,
                                        moderation: result[0].moderation,

                                    },
                                    process.env.USER_TOKEN, { expiresIn: '24h' }
                                )

                            });
                        })
                        .catch(error => reject({ error }));
                }
            })

        })
    };

    seeMyProfile(sqlInserts) {
        let sql = 'SELECT lastName, firstName, email FROM user WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            connectdb.query(sql, function(error, result) {
                if (error) return reject({ error: 'page indisponible' });
                resolve(result[0]);
            })
        })
    };
};

module.exports = User;