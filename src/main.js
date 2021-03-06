import Vue from 'vue';
import App from './App.vue';
import './assets/css/base.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  components: {
    App,
  },
});
