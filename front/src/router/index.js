import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'
import PostFormView from '../views/PostFormView.vue'
import PostFormUpdateView from '../views/PostFormUpdateView.vue'
import CommentFormUpdateView from '../views/CommentFormUpdateView.vue'


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { requiresAuth: false }
        },
        {
            path: '/posts',
            name: 'posts',
            component: PostsView,
            meta: { requiresAuth: true }
        },
        {
            path: '/post/:id',
            name: 'post',
            component: PostView,
            meta: { requiresAuth: true }
        },
        {
            path: '/postForm',
            name: 'postForm',
            component: PostFormView,
            meta: { requiresAuth: true }
        },
        {
            path: '/postForm/:id',
            name: 'postFormUpdate',
            component: PostFormUpdateView,
            meta: { requiresAuth: true }
        },
        {
            path: '/commentFormUpdate/:postId/:commentId',
            name: 'commentFormUpdate',
            component: CommentFormUpdateView,
            meta: { requiresAuth: true }
        }
    ]
})

export default router