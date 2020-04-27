<template>
  <basic-layout :isSubApp="isSubApp" :loading="appLoading" :content="appContent" />
</template>

<script>
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start,
  initGlobalState
} from 'qiankun';
import { mapGetters } from 'vuex';
import BasicLayout from '@/layouts/BasicLayout';

const genActiveRule = routerPrefix => {
  return location => location.pathname.startsWith(routerPrefix);
};

export default {
  name: 'Overview',
  components: {
    BasicLayout
  },
  data() {
    return {
      appLoading: false,
      appContent: ''
    };
  },
  computed: {
    ...mapGetters(['apps', 'isSubApp'])
  },
  created() {
    if (this.apps && this.apps.length > 0) {
      if (window.__POWERED_BY_QIANKUN__) {
        this.loadSubApp();
      } else {
        location.reload();
      }
    }
  },
  methods: {
    render({ appContent, loading }) {
      this.appContent = appContent;
      this.appLoading = loading;
    },
    loadSubApp() {
      /**
       * Step1 初始化应用（可选）
       */
      // render({ loading: true });
      /**
       * Step2 注册子应用
       */

      registerMicroApps(
        [
          {
            name: 'react16',
            entry: '//localhost:7100',
            // render: this.render,
            container: '#subapp-viewport',
            activeRule: genActiveRule('/react16')
          },
          {
            name: 'vue',
            entry: '//localhost:7101',
            // render: this.render,
            container: '#subapp-viewport',
            activeRule: genActiveRule('/vue')
          },
          {
            name: 'sub-vue',
            entry: '//localhost:7102',
            // render: this.render,
            container: '#subapp-viewport',
            activeRule: genActiveRule('/sub-vue')
          }
        ],
        {
          beforeLoad: [
            app => {
              console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            }
          ],
          beforeMount: [
            app => {
              console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            }
          ],
          afterUnmount: [
            app => {
              console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            }
          ]
        }
      );

      const { onGlobalStateChange, setGlobalState } = initGlobalState({
        user: 'qiankun'
      });

      onGlobalStateChange((value, prev) =>
        console.log('[onGlobalStateChange - master]:', value, prev)
      );

      setGlobalState({
        ignore: 'master',
        user: {
          name: 'master'
        }
      });

      /**
       * Step3 设置默认进入的子应用
       */
      setDefaultMountApp('/vue');

      /**
       * Step4 启动应用
       */
      start({
        // sandbox: { strictStyleIsolation: true },
        // singular: false
      });

      runAfterFirstMounted(() => {
        console.log('[MainApp] first app mounted');
      });
    }
  }
};
</script>
