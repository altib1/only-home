import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import './style.css';
import './registerServiceWorker.js';

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost/todos',
});

const app = createApp(App);
app.config.globalProperties.$http = http;

app.use(App);
app.mount('#app');
