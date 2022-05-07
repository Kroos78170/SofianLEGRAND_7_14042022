const connectdb = require('../connectdb.js');
const mysql = require('mysql');


class Moderation {
    getAllPosts() {
        let sql = "SELECT post.id, post.title, post.content, DATE_FORMAT(DATE(post.created_at), '%d/%m/%Y') AS date, TIME(post.created_at) AS time, user.lastName, user.firstName FROM post JOIN user ON post.id_author = user.id WHERE post.status = 'En_attente' ORDER BY post.created_at DESC";
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    };

    getAllComments() {
        let sql = "SELECT comment.id, comment.content, DATE_FORMAT(DATE(comment.created_at), '%d/%m/%Y') AS date, TIME(comment.created_at) AS time, user.lastName, user.firstName FROM comment JOIN user ON comment.id_author = user.id WHERE comment.id_post = ? ORDER BY comment.created_at";
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result);
            })

        })
    };
}


module.exports = Moderation;