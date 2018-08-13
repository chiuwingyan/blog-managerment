<template>
  <div id="app">
    <button @click="test">点击</button>
  <ul>
    <li v-for="(item,index) in this.type" :key="index">{{item}}</li>
  </ul>
     <div>{{this.token}}</div>
      <button @click="updateToken">测试token</button>
      <button @click="setArticleType('js')">测试子模块</button>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
