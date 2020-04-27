<template>
  <div class="login-main">
    <div class="login-content">
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          @change="handleTabClick"
        >
          <a-tab-pane key="tab1" tab="账号密码登录">
            <a-form-item>
              <a-input
                size="large"
                type="text"
                placeholder="请输入用户名"
                v-decorator="[
                  'username',
                  {
                    rules: [
                      { required: true, message: '请输入帐户名' },
                      { validator: handleUsernameOrEmail }
                    ],
                    validateTrigger: 'change'
                  }
                ]"
              >
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input
                size="large"
                type="password"
                autocomplete="false"
                placeholder="请输入密码"
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
                ]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>

        <a-form-item>
          <a-checkbox
            :checked="rememberMe"
            @change="handleRememberMeChange"
            v-decorator="['rememberMe']"
            >记住密码</a-checkbox
          >
        </a-form-item>

        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >
            确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import { timeFix } from '@/utils/util';
import { LOGIN_USERNAME, LOGIN_PASSWORD, LOGIN_REMEMBERME } from '@/store/mutation-types';

export default {
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      rememberMe: false
    };
  },
  mounted() {
    this.initForm();
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    initForm() {
      const rememberMe = Vue.ls.get(LOGIN_REMEMBERME);
      if (rememberMe) {
        const username = Vue.ls.get(LOGIN_USERNAME);
        const password = Vue.ls.get(LOGIN_PASSWORD);
        this.form.setFieldsValue({
          username,
          password,
          rememberMe
        });
        this.rememberMe = true;
      }
    },
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this;

      state.loginBtn = true;

      const validateFieldsKey =
        customActiveKey === 'tab1'
          ? ['username', 'password', 'rememberMe']
          : ['mobile', 'captcha', 'rememberMe'];

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const params = {
            cmd: 'user',
            cmd_op: 'login',
            userName: values.username,
            userPassword: values.password
          };
          Login(params)
            .then(() => this.loginSuccess(values))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false;
            });
        } else {
          setTimeout(() => {
            state.loginBtn = false;
          }, 600);
        }
      });
    },
    loginSuccess() {
      this.$router.push({ name: 'overview' });
      // this.$router.push({ name: 'analysis' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        });
      }, 1000);
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      });
    },
    handleRememberMeChange(e) {
      this.rememberMe = e.target.checked;
    }
  }
};
</script>

<style lang="less" scoped>
.login-main {
  min-width: 1200px;
  height: 608px;

  .login-content {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
}
.user-layout-login {
  width: 388px;
  height: 386px;
  background: #f3f3f3;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 102px;
  padding: 24px 32px;

  label {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
