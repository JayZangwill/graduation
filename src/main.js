import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import { Input, Form, FormItem, Button } from 'element-ui';

Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(VueRouter);
new Vue({
    el: '#app',
    render: h => h(App),
    router : new VueRouter(routes)
});