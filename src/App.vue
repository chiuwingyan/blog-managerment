<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'App',
    created() {
      let token = localStorage.getItem('token'),
        username = localStorage.getItem('username');
      this.$store.commit('setToken', token);
      this.$store.commit('setUsername', username);
    },
    methods: {
      ...mapActions([
        'updateToken'
      ]),
      // updateType(){
      //   this.$store.commit('articleType/setArticleType','js')
      // },
      ...mapMutations('articleType', [
        "setArticleType"
      ])
    },
    computed: {
      ...mapState('articleType', [
        "type"
      ]),
      ...mapState([
        'token'
      ]),
      count() {
        return this.$store.state.articleType.type[0]
      }
    }
  }
</script>

<style lang="scss"  type="text/scss">

  body {
    margin: 0px;
  }

  .el-aside {
    color: #409EFF;
  }
</style>
