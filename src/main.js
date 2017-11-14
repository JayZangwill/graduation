import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import { Input, Form, FormItem, Button, Menu, Submenu, MenuItem, MenuItemGroup, Table, TableColumn, Main, DropdownItem, Dropdown, DropdownMenu, Header, Aside, Container } from 'element-ui';

Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(VueRouter);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Main);
Vue.use(DropdownItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Container);

new Vue({
    el: '#app',
    render: h => h(App),
    router : new VueRouter(routes)
});