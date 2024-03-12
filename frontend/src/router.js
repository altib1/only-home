import { createRouter, createWebHistory } from 'vue-router';
import Signin from './pages/SignIn.vue';
import SignUp from './pages/SignUp.vue';
import PasswordResetRequest from './pages/PasswordReset.vue';
import PasswordResetConfirmation from './pages/PasswordResetConfirmation.vue';
import Homepage from './pages/HomePage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import store from './store.js';
import DashboardPageLocations from './pages/owner/DashboardPageLocations.vue';
import DashboardPageMessagerie from './pages/owner/DashboardPageMessagerie.vue';
import DashboardPageMonCompte from './pages/owner/DashboardPageMonCompte.vue';
import DashboardPageAide from './pages/owner/DashboardPageAide.vue';
import Swipe from './pages/SwipePage.vue';
import Filters from './pages/FiltersPage.vue';
import Chats from './pages/ChatsPage.vue';
import Informations from './pages/InformationsPage.vue';
import LocationsStudent from './pages/LocationsPage.vue';

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage,
  },
  {
    path: '/swipe',
    name: 'swipe',
    component: Swipe,
  },
  {
    path: '/filters',
    name: 'filters',
    component: Filters,
  },
  {
    path: '/informations',
    name: 'informations',
    component: Informations,
  },
  {
    path: '/locations-student',
    name: 'locationsStudent',
    component: LocationsStudent,
  },
  {
    path: '/chats',
    name: 'chats',
    component: Chats,
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
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/locations',
    name: 'DashboardPageLocations',
    component: DashboardPageLocations,
    meta: {
      requiresAuth: true,
      requiredRole: 'owner',
    },
  },
  {
    path: '/dashboard/messagerie',
    name: 'DashboardPageMessagerie',
    component: DashboardPageMessagerie,
    meta: {
      requiresAuth: true,
      requiredRole: 'owner',
    },
  },
  {
    path: '/dashboard/mon-compte',
    name: 'DashboardPageMonCompte',
    component: DashboardPageMonCompte,
    meta: {
      requiresAuth: true,
      requiredRole: 'owner',
    },
  },
  {
    path: '/dashboard/aide',
    name: 'DashboardPageAide',
    component: DashboardPageAide,
    meta: {
      requiresAuth: true,
      requiredRole: 'owner',
    },
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated;

    if (!isAuthenticated) {
      next({ name: 'SignIn' });
    } else if (to.meta.requiredRole && !store.getters[`isRole${to.meta.requiredRole.charAt(0).toUpperCase() + to.meta.requiredRole.slice(1)}`]) {
      next({ name: 'homepage' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;