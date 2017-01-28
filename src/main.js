// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App';
import LandingPage from './Landing';
import store from './store/store';
import '../static/css/weather-icons.css';

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  {
    path: '/app',
    component: App,
  },
  {
    path: '/',
    component: LandingPage,
  },
];

const router = new VueRouter({
  routes,
});
/*
// This is no place for this
this.$http.get(`${document.location.origin}/api/v1/sensors`)
  .then((sensorResponse) => {
    console.log(sensorResponse.body);
    // this.sensors = sensorResponse.body;
  });
*/
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  store,
  template: '<router-view/>',
});
