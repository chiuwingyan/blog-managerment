<template>
  <el-aside width="200px" style="background-color: #545c64">
    <el-menu 
    :default-openeds="['1', '3']"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#BAA645" router>

    <template v-for="item in router">
        <el-submenu index="" v-if="item.children && item.children.length>0" :key="item.meta.name"> 
          <template slot="title">
          <i :class="item.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <el-menu-item :index="'/main/'+item.path+'/'+v.path" v-for="(v,index) in item.children" :key="index">
          <i :class="v.icon"></i>
          <span slot="title">{{v.meta.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="'/main/'+item.path" v-else :key="item.meta.name">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.meta.name}}</span>
        </el-menu-item>
    </template>

    </el-menu>
  </el-aside>
</template>

<script type="text/ecmascript-6">
import {routerList} from '@/router/index'
export default {
mounted(){
    console.log(routerList)
},
 data() {
 return {
     router:routerList[1].children
 }
 },
 components: {

 }
}
</script>

<style scoped lang="scss" type="text/scss">

</style>
