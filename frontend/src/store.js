import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
      auth: {
        token: null,
        user: null,
      },
    },
    mutations: {
      setToken(state, token) {
        state.auth.token = token;
      },
      setUser(state, user) {
        state.auth.user = user;
      },
      logout(state) {
        state.auth.token = null;
        state.auth.user = null;
      },
    },
    actions: {
      login({ commit }, { token, user }) {
        return new Promise((resolve) => {
          console.log(token, user);
          commit('setToken', token);
          commit('setUser', user);
          resolve();
        });
      },
      logout({ commit }) {
        commit('logout');
      },
    },
    getters: {
      isAuthenticated: (state) => !!state.auth.token,
      getUser: (state) => state.auth.user,
    },
    plugins: [createPersistedState()],
  });