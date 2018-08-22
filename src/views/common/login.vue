<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">WebFlux Vue Blog</h2>
          <p class="brand-info__intro">SpringBoot2.x Vue2.x WebFlux 博客管理后台</p>
        </div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form :rules="dataRule" @keyup.enter.native="login()"
                   status-icon>
            <el-form-item prop="username">
              <el-input v-model="username" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="pwd" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="login()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        username: '',
        pwd: '',
        dataRule: {
          username: [
            {required: true, message: '帐号不能为空', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      // 提交表单
      async login() {
        const params = {
          password: this.pwd,
          username: this.username
        };
        const resp = await this.$request().post('auth/login', params);
        console.log('resp', resp)
        this.$store.commit('setToken', `Bearer ${resp.data.data.token}`);
        this.$store.commit('setUsername', resp.data.data.nickName);
        this.$router.push('/main');
      }
    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, .6);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/img/login_bg.jpg);
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-info__text {
      margin: 0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }
</style>
