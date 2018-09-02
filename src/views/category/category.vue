<template>


  <div>
    <el-button type="primary" @click="addOrUpdateDialog()">新增</el-button>
    <el-table
      :data="list.data"
      border
      style="width: 80% ">
      <el-table-column
        prop="categoryId"
        label="id"
        width="380">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类"
        width="680">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.id,scope.row.categoryName)" type="primary" plain size="small">修改</el-button>
          <el-button type="danger" plain size="small" @click="deleted(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-count="list.pageCount"
        :current-page="list.page"
        @current-change="fetchList"
        @prev-click="fetchList"
        @next-click="fetchList"
        :total="list.totalCount">
      </el-pagination>
    </div>
  </div>


</template>

<script type="text/ecmascript-6">


  export default {
    created() {
      this.fetchList();
    },
    data() {
      return {
        list: [],
        updateQuery: {},
        page: 1
      }
    },
    components: {},
    methods: {
      async fetchList(page) {
        // if (!page) {
        //   page = 1;
        // }
        const resp = await this.$request().get(`category/list?page=${page || 1}`);
        this.list = resp.data.data;
      },
      //更新
      update(id, name) {
        this.addOrUpdateDialog(id, name);
      },
      //删除
      deleted(id) {
        this.$confirm('确定要删除该分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.categoryName,
          type: 'warning'
        }).then(() => {

          let resp = request.delete('/tag/delete?ids=' + id);
          if (resp) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchList();
          }
        });
      },
      //新增
      addOrUpdateDialog(id, initVal) {
        this.$prompt('输入分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: initVal
        }).then(({value}) => {
          //添加
          this.addOrUpdateCategory(id, value);
        });
      },
      //请求
      async addOrUpdateCategory(id, value) {

        let params = {
          "id": id,
          "categoryName": value
        };
        let resp = null;
        //如果id不为空,证明是点击修改
        if (id) {
          resp = await request.put('/category/update', params);
        } else {
          resp = await request.post('/category/add', params);
        }

        if (resp) {
          this.$message({
            type: 'success',
            message: resp.data.msg
          });
          this.fetchList();
        }
      }
    }
  }

</script>

<style scoped lang="scss" ype="text/scss">
</style>
