<template>

  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="380">
    </el-table-column>
    <el-table-column
      prop="categoryName"
      label="分类"
      width="380">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="480">
      <template slot-scope="scope">
        <el-button @click="update(scope.row.id,scope.row.categoryName)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small" @click="deleted(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
export default {
  created(){
       this.fetchList();
  },
  data() {
    return {
        list:[],
        updateQuery:{}
    }
  },
  components: {

  },
  methods:{
    async fetchList(){
          const resp = await request.get('category/list');
          console.log(resp)
          this.list = resp.data.data;
      },
      update(id,name){
          console.log(id,name)
      },
      deleted(id){
         console.log(id)
        this.$confirm('确定要删除该分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      }
  }

</script>

<style scoped lang="scss" ype="text/scss" >
</style>
