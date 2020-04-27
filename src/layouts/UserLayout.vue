<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="login-header">
        <div class="logo">
          <span></span>
          <img alt src="@/assets/logo.png" />
        </div>
        <h1 class="logo-name">xxx管理平台</h1>
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="copyright">Copyright &copy; 2020 xxx All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView';
import { mixinDevice } from '@/utils/mixin';

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data() {
    return {};
  },
  mounted() {
    document.body.classList.add('userLayout');
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout');
  }
};
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/index';

#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    position: relative;

    .login-header {
      display: flex;
      width: 1200px;
      height: 86px;
      margin: 0 auto;

      .logo {
        height: 100%;
        margin-left: 30px;

        span {
          display: inline-block;
          width: 0;
          height: 100%;
          vertical-align: middle;
        }

        img {
          vertical-align: middle;
          max-width: 100px;
          max-height: 50px;
        }
      }

      .logo-name {
        margin-left: 16px;
        line-height: 86px;
        color: @primary-color;
      }
    }

    a {
      text-decoration: none;
    }

    .footer {
      width: 100%;
      padding: 0 16px;
      margin: 24px 0;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
