import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './store.js';
import axios from 'axios';
import Vue3TouchEvents from 'vue3-touch-events';


axios.interceptors.request.use((config) => {
    const token = store.state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

createApp(App).use(router).use(store).use(Vue3TouchEvents).mount('#app')
