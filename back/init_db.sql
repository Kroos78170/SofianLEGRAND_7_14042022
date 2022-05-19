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
    moderation INT DEFAULT 0,
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
    status VARCHAR(15) NOT NULL DEFAULT('En_attente'),
    created_at DATETIME
) DEFAULT CHARSET UTF8 ;

insert into user  VALUES
(NULL, 'Foiré', 'Roland', 'foire@gmail.com', "$2b$10$xvACjLeYLAWv5FWmBapYe.AnYVPhop3L1.K3WE00F..JL3yvujnqy", 0, NOW() ) , 
(NULL, 'Padpo', 'Roger','padpo@gmail.com', "$2b$10$xvACjLeYLAWv5FWmBapYe.AnYVPhop3L1.K3WE00F..JL3yvujnqy", 0, NOW() ) ,
(NULL, 'Legrand', 'Sofian', 'legrand@gmail.com', "$2b$10$xvACjLeYLAWv5FWmBapYe.AnYVPhop3L1.K3WE00F..JL3yvujnqy", 1, NOW() )
;
insert into post (title, content, image, id_author, status, created_at) VALUES
("titre", "fgdoifdoigj", "http://localhost:3000/images/DIDI.jpg", 2, "Valide", NOW() ),
("titre2", "fgdoifdoigj", "http://localhost:3000/images/DIDI.jpg", 1, "En_attente", NOW() ),
("titre3", "fgdoifdoigj", "http://localhost:3000/images/DIDI.jpg", 2 , "Valide", NOW() ),
("titre4", "fgdoifdoigj", "http://localhost:3000/images/DIDI.jpg", 1, "En_attente", NOW() ),
("titre5", "fgdoifdoigj", "http://localhost:3000/images/DIDI.jpg", 2, "Valide", NOW() )
;

insert into comment (content, id_author, id_post, status, created_at) VALUES
("Contenu", 1, 1, "Valide", NOW()),
("Contenu1", 1, 1, "Valide", NOW()),
("Contenu2", 1, 1, "Valide", NOW()),
("Contenu3", 1, 1, "Valide", NOW())

