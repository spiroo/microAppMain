import Vue from 'vue';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { welcome } from '@/utils/util';

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '/avatar2.jpg',
    roles: [],
    info: {},
    apps: null, // 子应用列表
    isSubApp: true // 当前显示的页面是否是子应用
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_APPS: (state, apps) => {
      state.apps = apps;
    },
    SET_ISSUBAPP: (state, bool) => {
      state.isSubApp = bool;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log('userInfo: ', userInfo);
      return new Promise((resolve, reject) => {
        if (userInfo.userName === 'admin' && userInfo.userPassword === 'admin') {
          Vue.ls.set(ACCESS_TOKEN, 'token', 7 * 24 * 60 * 60 * 1000);
          commit('SET_TOKEN', 'token');
          resolve();
        } else {
          reject({});
        }
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise(resolve => {
        const roles = ['admin'];
        commit('SET_ROLES', roles);
        commit('SET_INFO', { name: 'admin', realName: '管理员' });
        commit('SET_NAME', {
          name: '管理员',
          welcome: welcome()
        });

        // TODO 根据权限动态获取子应用
        commit('SET_APPS', [
          {
            name: 'react16',
            entry: '//localhost:7100'
          }
        ]);

        resolve(roles);
      });
    },

    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        Vue.ls.remove(ACCESS_TOKEN);
        resolve();
      });
    }
  }
};

export default user;
