import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './store.js';
import axios from 'axios';
import Vue2TouchEvents from 'vue2-touch-events';


axios.interceptors.request.use((config) => {
    const token = store.state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

createApp(App).use(router).use(store).use(Vue2TouchEvents, {
  disableClick: false,
  touchClass: '',
  tapTolerance: 10,
  touchHoldTolerance: 400,
  swipeTolerance: 30,
  longTapTimeInterval: 400,
  namespace: 'touch'
}).mount('#app')
