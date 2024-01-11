import { createRouter, createWebHistory } from 'vue-router';
import Signin from './pages/SignIn.vue';
import SignUp from './pages/SignUp.vue';
import PasswordResetRequest from './pages/PasswordReset.vue';
import PasswordResetConfirmation from './pages/PasswordResetConfirmation.vue';
import Homepage from './pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage,
  },
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
  {
    path: '/password-reset-request',
    name: 'PasswordResetRequest',
    component: PasswordResetRequest,
  },
  {
    path: '/password-reset-confirmation',
    name: 'PasswordResetConfirmation',
    component: PasswordResetConfirmation,
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;