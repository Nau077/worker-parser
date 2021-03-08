import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./index.css"

// if (process.env.NODE_ENV === 'development') {
//     Vue.config.devtools = true;
//     devtools.connect('localhost', 8080);
// }


createApp(App).use(store).use(router).mount('#app')
