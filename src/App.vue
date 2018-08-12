<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="test">点击</button>
    <router-view/>
  </div>
</template>

<script>
import request from 'utils/request' 
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
