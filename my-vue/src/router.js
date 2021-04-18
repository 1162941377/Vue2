import Vue from 'vue';
import VueRouter from './vue-router';
import Home from './views/Home';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        component: Home
    },
    {
        path: '/learn',
        component: () => import('./views/Learn.vue')
    },
    {
        path: '/student',
        component: () => import('./views/Student.vue')
    },
    {
        path: '/about',
        component: () => import('./views/About.vue')
    },
    {
        path: '/activity',
        component: () => import('./views/Activity.vue')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})