import Vue from 'vue';
import VueRouter from 'vue-router';
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
        component: () => import('./views/Activity.vue'),
        children: [{
                path: '',
                component: () => import('./views/Academic.vue')
            },
            {
                path: 'academic',
                name: 'academic',
                component: () => import('./views/Academic.vue')
            }, {
                path: 'personal',
                name: 'personal',
                component: () => import('./views/Personal.vue')
            }, {
                path: 'download',
                name: 'download',
                component: () => import('./views/Download.vue')
            }
        ]
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})