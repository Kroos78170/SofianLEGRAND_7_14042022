const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mods/user')

let user = new User();


exports.signup = (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    if (zxcvbn(req.body.password).score < 2) {
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
    let email = req.body.email;
    let password = req.body.password;
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.USER_TOKEN');
    const userId = decodedToken.userId;
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.USER_TOKEN');
    const userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'process.env.USER_TOKEN');
    const userId = decodedToken.userId;
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