import login from '../components/login.vue';
import home from '../components/home.vue';
import noFound from '../components/404.vue';
export default {
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: '/login',
        component: login
    }, {
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '*',
        component: noFound
    }]
};