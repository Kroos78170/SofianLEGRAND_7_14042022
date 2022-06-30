const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const mod = require('../middleware/moderator')
const multer = require('../middleware/multer');

const postCtrl = require('../controllers/post');

try {
    router.get('/', auth, postCtrl.getAllPosts);
    router.get('/:id', auth, postCtrl.getOnePost)
    router.post('/', auth, multer, postCtrl.createPost);
    router.put('/:id', auth, mod, multer, postCtrl.updatePost);
    router.delete('/:id', auth, mod, postCtrl.deletePost);

    router.get('/:id/comments', auth, postCtrl.getComments);
    router.get('/comments/:id', auth, postCtrl.getComment);
    router.post('/:id/comments', auth, postCtrl.createComment);
    router.put('/comments/:id', auth, mod, postCtrl.updateComment);
    router.delete('/comments/:id', auth, mod, postCtrl.deleteComment);

} catch (error) {
    console.log(error);
}

module.exports = router;