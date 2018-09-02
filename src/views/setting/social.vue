<template>

  <el-form label-position="left" label-width="80px" :model="socialInfo">
    <el-form-item label="微博">
      <el-input v-model="socialInfo.weibo"></el-input>
    </el-form-item>
    <el-form-item label="Github">
      <el-input v-model="socialInfo.github"></el-input>
    </el-form-item>
    <el-form-item label="Twitter">
      <el-input v-model="socialInfo.twitter"></el-input>
    </el-form-item>
    <el-form-item label="Facebook">
      <el-input v-model="socialInfo.facebook"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="socialInfo.email"></el-input>
    </el-form-item>
    <el-form-item label="qq">
      <el-input v-model="socialInfo.qq"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        socialInfo: ''
      }
    },
    created() {
      this.getSocialInfo();
    },
    methods: {

      /**
       * 获取社交信息
       * @returns {Promise<void>}
       */
      async getSocialInfo() {
        let resp = await this.$request().get('/social/info');
        if (resp.data.code === 1) {
          this.socialInfo = resp.data.data;
        }
      },
      /**
       * 保存修改
       * @returns {Promise<void>}
       */
      async submitForm() {
        let resp = await this.$request().put('/social/edit', this.socialInfo);
        this.$message({
          message: resp.data.msg,
          type: resp.data.code===1?'success':'error'
        });
      },


    }

  }
</script>

<style scoped>

</style>
