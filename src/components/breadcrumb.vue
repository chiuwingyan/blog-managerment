<template>
<el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.name'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
   created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta.name)
      const first = matched[0]
      console.log('first',matched)
      if (first && first.name !== '首页') {
        let pathUrl;
        pathUrl='/main/home'
        matched = [{ path: pathUrl, name:'首页'}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss"  type="text/css" scoped="">
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 15px;
    line-height: 41px;
    margin-left: 10px;
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    &:first-child{
        margin-left: 0;
    }
    .no-redirect {
    display:inline-block;
      min-width:96px;
      height:25px;
      line-height:25px;
      color: #fff;
      cursor: text;
      background:#42b983;
      border-color:#42b983;
      text-align:center;
      padding:0 10px;
      box-sizing: border-box;
    }
  }
  .el-breadcrumb__inner{
      a{
      display:inline-block;
      min-width:96px;
      height:25px;
      line-height:25px;
      color:#495060;
      border:1px solid #d8dce5;
      background:#fff;
      text-align:center;
      padding:0 10px;
      box-sizing: border-box;
      }
     
  }
</style>