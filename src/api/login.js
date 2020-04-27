import { axios } from '@/utils/request';

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/service',
    method: 'post',
    data: parameter
  });
}

export function getInfo(parameter) {
  return axios({
    url: '/service',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: parameter
  });
}

export function getCurrentUserNav() {
  return axios({
    url: '/user/nav',
    method: 'get'
  });
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
