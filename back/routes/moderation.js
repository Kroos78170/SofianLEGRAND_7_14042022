const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const moderationCtrl = require('../controllers/moderation');

try {
    router.get('/comments', auth, moderationCtrl.getAllComments);
    router.get('/posts', auth, moderationCtrl.getAllPosts);
    router.patch('/comments/:id', auth, moderationCtrl.modComment);
    router.patch('posts/:id', auth, moderationCtrl.modPost);
} catch (error) {
    console.log(error);
}

module.exports = router;