<template>
  <div id="app">
     <router-view></router-view>
  </div>
  
</template>

<script>
import request from 'utils/request' 
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  name: 'App',
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
