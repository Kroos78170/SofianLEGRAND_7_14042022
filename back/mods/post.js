const connectdb = require('../connectdb.js');
const mysql = require('mysql2');

class Post {
    //POSTS

    getAllPosts() {
        let sql = "SELECT post.id, post.title, post.image, post.content, DATE_FORMAT(DATE(post.created_at), '%d/%m/%Y') AS date, TIME(post.created_at) AS time, user.lastName, user.firstName FROM post JOIN user ON post.id_author = user.id ORDER BY post.created_at DESC";
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    };
    getOnePost(sqlInserts) {
        let sql = "SELECT p.id, p.title, p.content, p.image, DATE_FORMAT(DATE(p.created_at), '%d/%m/%Y') AS date, TIME(p.created_at) AS time, u.firstname, u.lastname, p.id_author as idAuthor FROM post p JOIN user u ON u.id = p.id_author WHERE p.id = ?";
        sql = mysql.format(sql, sqlInserts[0])
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result[0])
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
        sql1 = mysql.format(sql1, sqlInserts[3]);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                let sql3 = 'SELECT * FROM user WHERE id = ?'
                sql3 = mysql.format(sql3, sqlInserts[4]);
                connectdb.query(sql3, function(error3, result3) {
                    if (error3) throw error3;
                    if (sqlInserts[4] == result[0].id_author || result3[0].moderation == 1) {
                        let sql2 = 'UPDATE post SET title = ?, content = ?, image = ? WHERE id = ?';
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
        })
    };
    deletePost(sqlInserts) {
        let sql1 = 'SELECT * FROM post WHERE id = ?';
        sql1 = mysql.format(sql1, sqlInserts[0]);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                let sql3 = 'SELECT * FROM user WHERE id = ?'
                sql3 = mysql.format(sql3, sqlInserts[1]);
                connectdb.query(sql3, function(error3, result3) {
                    if (error3) throw error3;
                    if (sqlInserts[1] == result[0].id_author || result3[0].moderation == 1) {
                        let sql2 = 'DELETE FROM post WHERE id = ?';
                        sql2 = mysql.format(sql2, sqlInserts[0]);
                        connectdb.query(sql2, function(error, result) {
                            if (error) throw error;
                            resolve({ message: 'Post supprimé !' });
                        })
                    } else {
                        reject({ error: 'fonction indisponible' });
                    }

                });
            })

        })
    };

    // COMMENTS

    getComments(sqlInserts) {
        let sql = "SELECT comment.id, comment.id_post as postId, comment.content, DATE_FORMAT(DATE(comment.created_at), '%d/%m/%Y') AS date, TIME(comment.created_at) AS time, user.lastname, user.firstname, user.id AS idAuthor FROM comment JOIN user ON comment.id_author = user.id WHERE comment.id_post = ? ORDER BY comment.created_at DESC";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result);
            })

        })
    }

    getComment(sqlInserts) {
        let sql = "SELECT comment.id, comment.id_post as postId, comment.content, DATE_FORMAT(DATE(comment.created_at), '%d/%m/%Y') AS date, TIME(comment.created_at) AS time, user.lastname, user.firstname, user.id AS idAuthor FROM comment JOIN user ON comment.id_author = user.id WHERE comment.id = ? ORDER BY comment.created_at DESC";
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) => {
            connectdb.query(sql, function(error, result) {
                if (error) throw error;
                resolve(result[0]);
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
                let sql3 = 'SELECT * FROM user WHERE id = ?'
                sql3 = mysql.format(sql3, sqlInserts[2]);
                connectdb.query(sql3, function(error3, result3) {
                    if (error3) throw error3;
                    if (sqlInserts[2] == result[0].id_author || result3[0].moderation == 1) {
                        let sql2 = 'UPDATE comment SET content = ? WHERE id = ?';
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
        })
    }
    deleteComment(sqlInserts) {
        let sql1 = 'SELECT * FROM comment where id = ?';
        sql1 = mysql.format(sql1, sqlInserts[0]);
        return new Promise((resolve, reject) => {
            connectdb.query(sql1, function(error, result) {
                if (error) throw error;
                let sql3 = 'SELECT * FROM user WHERE id = ?'
                sql3 = mysql.format(sql3, sqlInserts[1]);
                connectdb.query(sql3, function(error3, result3) {
                    if (error3) throw error3;
                    if (sqlInserts[1] == result[0].id_author || result3[0].moderation == 1) {
                        let sql2 = 'DELETE FROM comment WHERE id = ?';
                        sql2 = mysql.format(sql2, sqlInserts[0]);
                        connectdb.query(sql2, function(error, result) {
                            if (error) throw error;
                            resolve({ message: 'Commentaire supprimé !' });
                        })
                    } else {
                        reject({ error: 'fonction indisponible' });
                    }

                });
            })
        })
    };
}


module.exports = Post;