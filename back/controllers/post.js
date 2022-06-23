const Post = require('../mods/post');
const tools = require('../utilities/tools');
require('dotenv').config()

let post = new Post();


// POSTS

exports.getAllPosts = (req, res, next) => {
    post.getAllPosts()
        .then((response) => {
            res.status(200).json(response);
        });
}
exports.getOnePost = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    post.getOnePost(sqlInserts)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}
exports.createPost = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization);
    console.log(req.file, req.body)
    let { title, content } = req.body;
    const image = 'file' in req ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    let sqlInserts = [title, content, image, userId];
    post.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(response);
        })
}
exports.updatePost = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization);
    let { title, content } = req.body;
    const image = 'file' in req ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    let postId = req.params.id;
    let sqlInserts = [title, content, image, postId, userId];
    post.updatePost(sqlInserts)
        .then((response) => {
            res.status(201).json(response);
        })
        .catch((error) => {
            res.status(400).json(error);
        })
}
exports.deletePost = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let postId = req.params.id;
    let sqlInserts = [postId, userId];
    post.deletePost(sqlInserts)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        })
}


// COMMENTS

exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    post.getComments(sqlInserts)
        .then((response) => {
            res.status(200).json(response);
        })
}

exports.getComment = (req, res, next) => {
    let commentId = req.params.id;
    let sqlInserts = [commentId];
    post.getComment(sqlInserts)
        .then((response) => {
            res.status(200).json(response);
        })
}
exports.createComment = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization);
    let postId = req.params.id;
    let content = req.body.content;
    let sqlInserts = [content, userId, postId];
    post.createComment(sqlInserts)
        .then((response) => {
            res.status(201).json(response);
        })
}

exports.updateComment = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlInserts = [content, commentId, userId];
    post.updateComment(sqlInserts)
        .then((response) => {
            res.status(201).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        })
}
exports.deleteComment = (req, res, next) => {
    const userId = tools.getUserIdToken(req.headers.authorization)
    let commentId = req.params.id;
    let sqlInserts = [commentId, userId];
    post.deleteComment(sqlInserts)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        })
}