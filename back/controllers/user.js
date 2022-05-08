const bcrypt = require('bcrypt');
const User = require('../mods/user');
const zxcvbn = require('zxcvbn');
const tools = require('../utilities/tools');

let user = new User();


exports.signup = (req, res, next) => {
    let { lastName, firstName, email, password } = req.body;
    if (zxcvbn(password).score < 2) {
        return res.status(401).json({ error: "Le mot de passe est trop faible" })
    };
    bcrypt.hash(password, 10)
        .then(hash => {
            let sqlInserts = [lastName, firstName, email, hash];
            user.signup(sqlInserts)
                .then((response) => {
                    res.status(201).json(response)
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
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
};

exports.seeMyProfile = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let sqlInserts = [userId];
    user.seeMyProfile(sqlInserts)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error)
        })
};