const connectdb = require('../connectdb.js');
const mysql = require('mysql2');

class Post {
    //POSTS

    getAllPosts() {
        let sql = "SELECT post.id, post.title, post.content, DATE_FORMAT(DATE(post.created_at), '%d/%m/%Y') AS date, TIME(post.created_at) AS time, user.lastName, user.firstName FROM post JOIN user ON post.id_author = user.id ORDER BY post.created_at DESC";
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    }
    createPost(sqlInserts) {
        let sql = 'INSERT INTO post (title, content, image, id_author, created_at)  VALUES( ?, ?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        console.log(sqlInserts)
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve({ message: 'Nouveau post !' });
            })
        })
    }
    updatePost(sqlInserts1, sqlInserts2) {
        let sql1 = 'SELECT * FROM post where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts2[3] == result[0].userId) {
                    let sql2 = 'UPDATE post SET content = ? WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connectdb.query(sql2, function(error, result) {
                        if (error) throw error;
                        resolve({ message: 'Post modifié !' });
                    })
                } else {
                    reject({ error: 'fonction indisponible' });
                }
            })
        });
    }
    deletePost(sqlInserts1, sqlInserts2) {
        let sql1 = 'SELECT * FROM post where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts2[1] == result[0].userId) {
                    let sql2 = 'DELETE FROM post WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connectdb.query(sql2, function(error, result) {
                        if (error) throw error;
                        resolve({ message: 'Post supprimé !' });
                    })
                } else {
                    reject({ error: 'fonction indisponible' });
                }

            });
        })
    }

    // COMMENTS

    getComments(sqlInserts) {
        let sql = "SELECT * FROM comment JOIN user on comments.userId = users.id WHERE postId = ? ORDER BY date";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result);
            })

        })
    }
    createComment(sqlInserts) {
        let sql = 'INSERT INTO comment VALUES(NULL, ?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve({ message: 'Nouveau commentaire !' })
            })
        })
    }
    updateComment(sqlInserts1, sqlInserts2) {
        let sql1 = 'SELECT * FROM comment where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts2[2] == result[0].userId) {
                    let sql2 = 'UPDATE comment SET comContent = ? WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
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
    deleteComment(sqlInserts1, sqlInserts2) {
        let sql1 = 'SELECT * FROM comment where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                if (sqlInserts2[1] == result[0].userId) {
                    let sql2 = 'DELETE FROM comment WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
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