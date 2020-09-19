import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueAppend from 'vue-append';
import VueResource from 'vue-resource';

//import renders from './components/render.vue';
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueAppend);
new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount("#app");
/*new Vue({
  el: '#render',
  render: h => h(renders)
}).$mount("#render");*/
