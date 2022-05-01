const Post = require('../mods/post');
const tools = require('../utilities/tools');
require('dotenv').config()

let post = new Post();


// POSTS

exports.getAllPosts = (req, res, next) => {
    post.getAllPosts()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
}
exports.createPost = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization);
    //créer l'url de l'image
    const image = "URL à créer"
    let { title, content } = req.body;
    let sqlInserts = [title, content, image, userId];
    post.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
}
exports.updatePost = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization);
    let { title, content } = req.body;
    let postId = req.params.id;
    let sqlInserts = [title, content, postId, userId];
    post.updatePost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            res.status(400).json(JSON.stringify(error));
        })
}
exports.deletePost = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let postId = req.params.id;
    let sqlInserts = [postId, userId];
    post.deletePost(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}


// COMMENTS

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    post.getComments(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
}
exports.createComment = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization);
    let postId = req.params.id;
    let content = req.body.content;
    let sqlInserts = [content, userId, postId];
    post.createComment(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
}

exports.updateComment = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlInserts = [content, commentId, userId];
    post.updatePost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}
exports.deleteComment = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let commentId = req.params.id;
    let sqlInserts = [commentId, userId];
    post.deletePost(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}