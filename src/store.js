import Vue from 'vue'
import Vuex from 'vuex'
import JWT from "./services/jwt-token.service";

Vue.use(Vuex);
Vue.use(JWT);

export default new Vuex.Store({
  state: {
    loading: false,
    error: false,
    authenticate: !!Vue.prototype.$jwt.token(),
    user: null,
    success: false,
    menu: [
      {
        title: 'условия игры',
        anchor: '#rules'
      },
      {
        title: 'призы',
        anchor: '#conditions'
      },
      {
        title: 'розыгрыш',
        anchor: '#game'
      },
      {
        title: 'регистрация',
        anchor: '#registration'
      }
    ]
  },
  mutations: {
    loading(state) {
      state.loading = !state.loading;
    },
    error(state, data) {
      state.error = data;
    },
    authenticate(state, token) {
      state.authenticate = true;
      Vue.prototype.$jwt.store(token);
    },
    user(state, data) {
      state.user = data
    },
    success(state, data) {
      state.success = data
    }
  },
  getters: {
    error(state) {
      return state.error;
    },
    success(state) {
      return state.success;
    },
    authenticate(state) {
      return state.authenticate;
    },
    loading(state) {
      return state.loading;
    },
    menu(state) {
      return state.menu;
    },
    user(state) {
      return state.user
    }
  },
  actions: {

  }
})
