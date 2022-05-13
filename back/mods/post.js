const connectdb = require('../connectdb.js');
const mysql = require('mysql2');

class Post {
    //POSTS

    getAllPosts() {
        let sql = "SELECT post.id, post.title, post.content, DATE_FORMAT(DATE(post.created_at), '%d/%m/%Y') AS date, TIME(post.created_at) AS time, user.lastName, user.firstName FROM post JOIN user ON post.id_author = user.id AND post.status= 'valide' ORDER BY post.created_at DESC";
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    };
    getOnePost(sqlInserts) {
        let sql = "SELECT post.id, post.title, post.content, DATE_FORMAT(DATE(post.created_at), '%d/%m/%Y') AS date, TIME(post.created_at) AS time FROM post WHERE id = ?";
        sql = mysql.format(sql, sqlInserts[0])
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    };
    createPost(sqlInserts) {
        let sql = 'INSERT INTO post (title, content, image, id_author, created_at)  VALUES ( ?, ?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        console.log(sqlInserts)
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve({ message: 'Nouveau post !' });
            })
        })
    };
    updatePost(sqlInserts) {
        let sql1 = 'SELECT * FROM post WHERE id = ?';
        sql1 = mysql.format(sql1, sqlInserts[2]);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts[3] == result[0].id_author) {
                    let sql2 = 'UPDATE post SET title = ?, content = ? WHERE id = ? AND id_author = ?';
                    sql2 = mysql.format(sql2, sqlInserts);
                    connectdb.query(sql2, function(error, result) {
                        if (error) throw error;
                        resolve({ message: 'Post modifié !' });
                    })
                } else {
                    reject({ error: 'fonction indisponible' });
                }
            })
        });
    };
    deletePost(sqlInserts) {
        let sql1 = 'SELECT * FROM post where id = ?';
        sql1 = mysql.format(sql1, sqlInserts[0]);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts[1] == result[0].id_author) {
                    let sql2 = 'DELETE FROM post WHERE id = ? AND id_author = ?';
                    sql2 = mysql.format(sql2, sqlInserts);
                    connectdb.query(sql2, function(error, result) {
                        if (error) throw error;
                        resolve({ message: 'Post supprimé !' });
                    })
                } else {
                    reject({ error: 'fonction indisponible' });
                }

            });
        })
    };

    // COMMENTS

    getComments(sqlInserts) {
        let sql = "SELECT comment.id, comment.content, DATE_FORMAT(DATE(comment.created_at), '%d/%m/%Y') AS date, TIME(comment.created_at) AS time, user.lastName, user.firstName FROM comment JOIN user ON comment.id_author = user.id WHERE comment.id_post = ? ORDER BY comment.created_at";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result);
            })

        })
    }
    createComment(sqlInserts) {
        let sql = 'INSERT INTO comment (content, id_author, id_post, created_at) VALUES(?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve({ message: 'Nouveau commentaire !' })
            })
        })
    }
    updateComment(sqlInserts) {
        let sql1 = 'SELECT * FROM comment where id = ?';
        sql1 = mysql.format(sql1, sqlInserts[1]);
        return new Promise((resolve) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts[2] == result[0].id_author) {
                    let sql2 = 'UPDATE comment SET content = ? WHERE id = ? AND id_author = ?';
                    sql2 = mysql.format(sql2, sqlInserts);
                    connectdb.query(sql2, function(error, result) {
                        if (error) throw error;
                        resolve({ message: 'Commentaire modifié !' });
                    })
                } else {
                    reject({ error: 'fonction indisponible' });
                }
            })
        });
    }
    deleteComment(sqlInserts) {
        let sql1 = 'SELECT * FROM comment where id = ?';
        sql1 = mysql.format(sql1, sqlInserts[0]);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts[1] == result[0].id_author) {
                    let sql2 = 'DELETE FROM comment WHERE id = ? AND id_author = ?';
                    sql2 = mysql.format(sql2, sqlInserts);
                    connectdb.query(sql2, function(error, result) {
                        if (error) throw error;
                        resolve({ message: 'Commentaire supprimé !' });
                    })
                } else {
                    reject({ error: 'fonction indisponible' });
                }

            });
        })
    }
};


module.exports = Post;