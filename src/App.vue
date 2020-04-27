<template>
  <a-locale-provider :locale="locale">
    <div id="app-container">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { AppDeviceEnquire } from '@/utils/mixin';

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>

<style>
#app-container {
  height: 100%;
}
</style>
