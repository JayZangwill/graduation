import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import { Button, Select } from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(VueRouter);
new Vue({
    el: '#app',
    render: h => h(App),
    router : new VueRouter(routes)
});