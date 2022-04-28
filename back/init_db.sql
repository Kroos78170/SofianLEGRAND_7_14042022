DROP  DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania
    DEFAULT CHARACTER SET = 'utf8mb4';
use groupomania;
CREATE TABLE user(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    lastname VARCHAR(255) NOT NULL ,
    firstname VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATE 
) DEFAULT CHARSET UTF8 ;

CREATE TABLE post(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    id_author INT NOT NULL, 
    FOREIGN KEY (id_author) REFERENCES user(id),
    status VARCHAR(15) NOT NULL DEFAULT('En_attente'),
    created_at DATETIME
) DEFAULT CHARSET UTF8 ;

CREATE TABLE comment(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    content TEXT NOT NULL ,
    id_author INT NOT NULL,
    id_post INT NOT NULL, 
    FOREIGN KEY (id_author) REFERENCES user(id),
    FOREIGN KEY (id_post) REFERENCES post(id),
    created_at DATETIME
) DEFAULT CHARSET UTF8 ;

insert into user  VALUES
(null, 'nom', 'prenom', 'ffdzr@fdfdsf', "$2b$10$xvACjLeYLAWv5FWmBapYe.AnYVPhop3L1.K3WE00F..JL3yvujnqy",NOW() ) , 
(null, 'nom2', 'prenom2','ffdzr@fdfdsf2', "$2b$10$xvACjLeYLAWv5FWmBapYe.AnYVPhop3L1.K3WE00F..JL3yvujnqy", NOW() ) 
;
insert into post (title, content, image, id_author, created_at) VALUES
("titre", "fgdoifdoigj", "iumage.jpg", 2, NOW() ),
("titre2", "fgdoifdoigj", "iumage.jpg", 1, NOW() ),
("titre3", "fgdoifdoigj", "iumage.jpg", 2 ,NOW() ),
("titre4", "fgdoifdoigj", "iumage.jpg", 1, NOW() ),
("titre5", "fgdoifdoigj", "iumage.jpg", 2, NOW() )
;