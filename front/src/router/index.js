import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'
import PostFormView from '../views/PostFormView.vue'
import PostFormUpdateView from '../views/PostFormUpdateView.vue'

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
            path: '/postForm/:id',
            name: 'postForm',
            component: PostFormView,
            meta: { requiresAuth: true }
        },
        {
            path: '/postForm/:id',
            name: 'postForm',
            component: PostFormUpdateView,
            meta: { requiresAuth: true }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/AboutView.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

export default router