<template>
  <div>
<el-container style="height: 920px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: #545c64">
    <el-menu 
    :default-openeds="['1', '3']"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#BAA645" router>
      <el-menu-item index="/main/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

        <el-submenu index="">
          <template slot="title">
          <i class="el-icon-menu"></i>
            <span slot="title">文章管理</span>
          </template>
          <el-menu-item index="/main/article/addActicle">新增文章</el-menu-item>
        </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>猪猪仔</span>
    </el-header>
    
    <el-main>
      <section class="main">
        <el-collapse-transition>
         <router-view></router-view>
         </el-collapse-transition>
      </section>
    </el-main>
  </el-container>
</el-container>

  </div>
  
</template>

<script>
import request from 'utils/request' 
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  mounted(){
      console.log(this.$router.options.routes)
  },
  methods:{
   async  test(){
      const params = {
        name:'mary',
        age:100
    }
    const data = await request.get('123',params);
    console.log(data);
    },
    ...mapActions([
      'updateToken'
    ]),
    // updateType(){
    //   this.$store.commit('articleType/setArticleType','js')
    // },
    ...mapMutations('articleType',[
      "setArticleType"
    ])
  },
  computed:{
    ...mapState('articleType',[
      "type"
    ]),
    ...mapState([
      'token'
    ]),
    count(){
      return this.$store.state.articleType.type[0]
    }
  }
}
</script>

<style lang="scss" scoped="" type="text/scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
