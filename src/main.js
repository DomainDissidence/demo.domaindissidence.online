import './css/main.css'
// import "./css/_breakpoints.scss";
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";

createApp(App)
    .use(createPinia())
    .mount('#app');
