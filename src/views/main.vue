<template>
  <div>
    <main-navbar/>
    <Nav></Nav>
    <div class="site-content__wrapper">
      <main-content/>
    </div>
  </div>
</template>

<script>
  import request from 'utils/request'
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import MainNavbar from './main-navbar'
  import Nav from '@/components/nav'
  import MainContent from './main-content'

  export default {
    components: {
      Nav,
      MainNavbar,
      MainContent
    },
    data() {
      return {
        height: window.innerHeight
      }
    },
    methods: {
      async test() {
        const params = {
          name: 'mary',
          age: 100
        }
        const data = await request.get('123', params);
        console.log(data);
      },
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
