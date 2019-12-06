/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';


window.Form=Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import Swal from 'sweetalert2';
window.Swal=Swal;


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast=Toast;


window.Fire=new Vue();

import VueRouter from 'vue-router';
Vue.use(VueRouter)

Vue.component('profile', require('./components/Profile.vue').default);
Vue.component('dashboard', require('./components/Dashboard.vue').default);
Vue.component('users', require('./components/Users.vue').default);

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
//let routes = [
  import Profile from './components/Profile.vue';
  import Dashboard from './components/Dashboard.vue';
  import Users from './components/Users.vue';
export const routes = [{
  path: '/profile',
  component: Profile,
  name: 'profile'
},
{
  path: '/dashboard',
  component: Dashboard,
  name: 'dashboard' 
},
{ path: '/users',
component: Users,
name: 'users'}
];
    //{ path: '/dashboard', component: require('./components/Dashboard.vue') },
    //{ path: '/profile', component: require('./components/Profile.vue') },
    //{ path: '/joke', component: require('./components/Joke.vue') },
    //{ path: '/users', component: require('./components/Users.vue') }
//]
  
  
  //REGISTER ROUTES
  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`,haha
  })
   Vue.filter('upText',function(text){
     return text.charAt(0).toUpperCase()+text.slice(1)

  });
  Vue.filter('myDate',function(created){
    return moment(created).format('MMMM Do YYYY');

  });


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
     
}).$mount("#app");
