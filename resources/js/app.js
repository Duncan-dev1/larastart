/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import { Form, HasError, AlertError } from 'vform';

import Gate from './Gate';
Vue.prototype.$gate=new Gate(window.user);

window.Form=Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import Swal from 'sweetalert2';
window.Swal=Swal;


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
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
Vue.component('joke', require('./components/Joke.vue').default);
Vue.component('developer', require('./components/Developer.vue').default);
Vue.component('water', require('./components/Water.vue').default);
Vue.component('test', require('./components/Test.vue').default);

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'green',
  failedColor: 'red',
  height: '2px'
})
//let routes = [
  import Profile from './components/Profile.vue';
  import Joke from './components/Joke.vue';
  import Dashboard from './components/Dashboard.vue';
  import Users from './components/Users.vue';
  import Water from './components/Water.vue';
  import Test from './components/Test.vue';
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
name: 'users'
},
{ path: '/joke',
component: Joke,
name: 'joke'
},
{ path: '/test',
component: Test,
name: 'test'
},
{ path: '/water',
component: Water,
name: 'water'}
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

  //PASSPORT COMPONENT REGISTRATION
  Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
Vue.component(
    'not-found',
    require('./components/NotFound.vue').default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
     
}).$mount("#app");
