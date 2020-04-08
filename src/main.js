import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8080/erp'


Vue.config.productionTip = false

var instance = axios.create({
    baseURL: 'http://182.92.160.71:8085/erp'
});

instance.interceptors.request.use(config => {

    if (config.method == "post") {
        let ret = ''
        for (let it in config.data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
        }
        config.data = ret;
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return config
}, err => {
    // console.log(err);
})

Vue.prototype.$http = instance
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')