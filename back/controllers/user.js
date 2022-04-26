const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mods/user');
const zxcvbn = require('zxcvbn');

let user = new User();


exports.signup = (req, res, next) => {
    let { firstName, lastName, email, password } = req.body;
    if (zxcvbn(password).score < 2) {
        return res.status(401).json({ error: "Le mot de passe est trop faible" })
    };
    bcrypt.hash(password, 10)
        .then(hash => {
            let sqlInserts = [firstName, lastName, email, hash];
            user.signup(sqlInserts)
                .then((response) => {
                    res.status(201).json(JSON.stringify(response))
                })
                .catch((error) => {
                    console.error(error);
                    res.status(400).json({ error })
                })
        })
        .catch(error => res.status(500).json(error))
};


exports.login = (req, res, next) => {
    let { email, password } = req.body;
    let sqlInserts = [email];
    user.login(sqlInserts, password)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            res.status(400).json(error)
        })
};

exports.seeMyProfile = (req, res, next) => {
    const userId = user.getUserIdToken(req.headers.authorization)
    let sqlInserts = [userId];
    user.seeMyProfile(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error)
        })
};

exports.updateUser = (req, res, next) => {
    const userId = user.getUserIdToken(req.headers.authorization)
    let { firstName, lastName, email } = req.body;
    let sqlInserts = [firstName, lastName, email, userId];
    user.updateUser(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            res.status(400).json(error)
        })
};

exports.deleteUser = (req, res, next) => {
    const userId = user.getUserIdToken(req.headers.authorization)
    let sqlInserts = [userId];
    user.deleteUser(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error)
        })
};