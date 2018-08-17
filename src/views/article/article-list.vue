<template>
 <div class="article">
<el-input
    placeholder="请输入文章标题"
    prefix-icon="el-icon-search"
    v-model="inputVal"
    style="width:15%;margin-bottom:30px;margin-right:20px">
  </el-input>
   <el-button type="primary" icon="el-icon-search">搜索</el-button>
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="文章标题"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="文章简介"
     >
    </el-table-column>
    <el-table-column
      prop="address"
      label="文章分类">
    </el-table-column>
    <el-table-column
      prop="address"
      label="创建时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="更新时间"
      width="180">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.id,scope.row.categoryName)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleted(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="page.totalCoun" v-show="page.pageCount" :page-count="page.pageCount" :page-size="page.pageSize">
</el-pagination>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {
     articleList:[],

 }
 },
 components: {

 },
 methods:{
     goto(){
         this.$router.push('article');
     }
 }
}
</script>

<style scoped lang="scss" type="text/scss">
.el-pagination{
    margin-top: 20px;
    text-align: center;
}
</style>
