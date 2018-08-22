<template>
  <div class="login">
      <h1>my blog admin</h1>
      用户名：<el-input v-model="username" placeholder="请输入用户名"></el-input><br />
      密码：<el-input v-model="pwd" placeholder="请输入密码"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script type="text/ecmascript-6">

import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
        username:'',
        pwd:''
    }
  },
  components: {

  },
  methods:{
    async login(){
        const params = {
            password:this.pwd,
            username:this.username
        };
        const resp = await this.$request().post('auth/login',params);
        console.log('resp',resp)
        this.$store.commit('setToken',`Bearer ${resp.data.data.token}`);
        this.$store.commit('setUsername',resp.data.data.nickName);
        this.$router.push('/main');
      }
  }
}
</script>

<style scoped lang="scss" ype="text/scss" >
</style>
