// eslint-disable-next-line
import {
  UserLayout,
  // BasicLayout,
  BlankLayout
} from '@/layouts';

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BlankLayout,
    redirect: '/overview',
    children: [
      {
        path: '/overview',
        name: 'overview',
        component: () => import('@/views/overview/Index'),
        // hidden: true,
        redirect: '/vue',
        meta: {
          title: '作业管理',
          icon: 'appstore',
          keepAlive: true,
          permission: ['admin']
        },
        children: [
          {
            path: '/vue',
            name: 'vue',
            meta: {
              title: 'vue',
              icon: 'appstore',
              permission: ['admin'],
              subApp: true
            }
          },
          {
            path: '/react16',
            name: 'react',
            meta: {
              title: 'react',
              icon: 'appstore',
              permission: ['admin'],
              subApp: true
            }
          },
          {
            path: '/sub-vue',
            name: 'sub-vue',
            meta: {
              title: 'sub-vue',
              icon: 'appstore',
              permission: ['admin'],
              subApp: true
            }
          },
          {
            path: '/404',
            name: '404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: {
              title: '404',
              icon: 'appstore',
              permission: ['admin']
            }
          }
        ]
      }
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
];
