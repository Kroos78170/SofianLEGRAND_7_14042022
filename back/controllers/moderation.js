const jwt = require('jsonwebtoken');
const Moderation = require('../mods/moderation');
require('dotenv').config()

let moderation = new Moderation();

exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const mod = decodedToken.moderation;
    if (mod == 1) {
        moderation.getAllPosts()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json(error)
            });
    } else {
        res.status(400).json({ error: 'Requête non authorisée' })
    }
}
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const mod = decodedToken.moderation;
    console.log(mod);
    if (mod == 1) {
        let postId = req.params.id;
        let sqlInserts = [postId];
        moderation.deletePost(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
            .catch((error) => {
                res.status(400).json(error)
            });
    } else {
        res.status(400).json({ error: 'Requête non authorisée' })
    }
}
exports.getAllComments = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const mod = decodedToken.moderation;
    if (mod == 1) {
        moderation.getAllComments()
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({ error: 'Requête non authorisée' })
    }
}
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
    const mod = decodedToken.moderation;
    if (mod == 1) {
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        moderation.deleteComment(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({ error: 'Requête non authorisée' })
    }
}