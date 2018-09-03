<template>
  <el-aside width="200px" style="background-color:#303133">
    <el-menu
      background-color="#303133"
      text-color="#8a979e"
      active-text-color="#fff" router :unique-opened="true">

      <template v-for="(item,index) in router">
        <!--有子菜单的-->
        <el-submenu index="item.path" v-if="item.meta.isShow && item.children && item.children.length>0" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!--子菜单-->
          <el-menu-item :index="'/main/'+item.path+'/'+v.path" v-for="(v,index) in item.children" :key="index"
                        v-if="v.meta.isShow">
            <i :class="v.icon"></i>
            <span slot="title">{{v.meta.name}}</span>
          </el-menu-item>
        </el-submenu>
        <!--没有子菜单的-->
        <el-menu-item :index="'/main/'+item.path" v-else-if="item.meta.isShow" :key="item.meta.name">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.name}}</span>
        </el-menu-item>
        <!--不显示的-->
        <el-menu-item v-else :key="item.meta.name" v-show="false">
        </el-menu-item>

      </template>

    </el-menu>
  </el-aside>
</template>

<script type="text/ecmascript-6">
  import {routerList} from '@/router/index'

  export default {
    mounted() {

    },
    data() {
      return {
        router: routerList[2].children
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {}
  }
</script>

<style scoped lang="scss" type="text/scss">

</style>
