const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const postCtrl = require('../controllers/post');

try {
    router.get('/', auth, postCtrl.getAllPosts);
    router.get('/:id', auth, postCtrl.getOnePost)
    router.post('/', auth, multer, postCtrl.createPost);
    router.put('/:id', auth, multer, postCtrl.updatePost);
    router.delete('/:id', auth, postCtrl.deletePost);

    router.get('/:id/comments', auth, postCtrl.getComments);
    router.post('/:id/comments', auth, postCtrl.createComment);
    router.put('/comments/:id', auth, postCtrl.updateComment);
    router.delete('/comments/:id', auth, postCtrl.deleteComment);

} catch (error) {
    console.log(error);
}

module.exports = router;