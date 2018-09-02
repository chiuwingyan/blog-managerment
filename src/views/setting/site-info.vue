<template>
  <el-form label-position="left" label-width="80px" :model="siteInfo">
    <el-form-item label="站点名">
      <el-input v-model="siteInfo.blogName"></el-input>
    </el-form-item>
    <el-form-item label="站点标题">
      <el-input v-model="siteInfo.blogTitle"></el-input>
    </el-form-item>
    <el-form-item label="个人描述">
      <el-input v-model="siteInfo.blogDesc"></el-input>
    </el-form-item>
    <el-form-item label="个人Logo">
      <el-input v-model="siteInfo.blogLogo"></el-input>
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

        /**
         * 站点信息对象
         */
        siteInfo: '',
      }
    },
    created() {
      this.getSiteInfo();
    },
    methods: {

      /**
       * 获取站点信息
       * @returns {Promise<void>}
       */
      async getSiteInfo() {
        let resp = await this.$request().get('/site/info');
        if (resp.data.code === 1) {
          this.siteInfo = resp.data.data;
        } else {
          this.$message({
            message: resp.data.msg,
            type: 'error'
          })
        }
      },
      /**
       * 保存站点
       * @returns {Promise<void>}
       */
      async submitForm(){
        let resp = await this.$request().put('/site/edit',this.siteInfo);
        this.$message({
          message: resp.data.msg,
          type: resp.data.code===1?'success':'error'
        });
      }
    }
  }
</script>

<style scoped>

</style>
