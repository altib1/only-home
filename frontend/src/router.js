import { createRouter, createWebHistory } from 'vue-router';
import Signin from './pages/SignIn.vue';
import SignUp from './pages/SignUp.vue';

const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: Signin,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;