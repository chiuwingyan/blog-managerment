<template>
  <div>
<el-container :style="'height:'+ height+'px; border: 1px solid #eee;'">



    <el-header style="text-align: right; font-size: 12px;background-color:#ffffff">
      <div class="logo">BLOG管理后台</div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
      </el-dropdown>
      <span>{{this.$store.state.username}}</span>
    </el-header>

      <el-container>
        <Nav></Nav>
        <el-main>
          <breadcrumb></breadcrumb>
        <section class="main">
         <!--<el-collapse-transition>-->
         <router-view></router-view>
        <!--</el-collapse-transition>-->
      </section>
    </el-main>
  </el-container>
</el-container>

  </div>

</template>

<script>
import request from 'utils/request'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
import Nav from '@/components/nav'
import breadcrumb from '@/components/breadcrumb'
import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";
export default {
  components:{
    ElCollapseTransition,
      Nav,
      breadcrumb
  },
  data(){
    return{
      height:window.innerHeight
    }
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
  .el-header{
   box-shadow:0px 12px 8px -14px #909399;
   padding: 0;
   .logo{
     width: 200px;
     float: left;
     height: 100%;
     text-align: center;
     background-color:  #45c2b5;
     color: #ffffff;
     line-height: 60px;
     font-size: 20px;
     font-weight: bold;
   }
  }
  .el-aside {
    color: #333;
  }
  .main{
    height: 100%;
  }
</style>
