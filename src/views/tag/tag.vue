<template>
  <div>

    <el-button type="primary" @click="addOrUpdateDialog()">新增</el-button>
    <el-table
      :data="list.data"
      stripe
      style="width: 1000% ">
      <el-table-column
        prop="id"
        label="id"
        width="380">
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签名"
        width="680">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.id,scope.row.tagName)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleted(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-count="list.pageCount"
        :current-page="list.page"
        @current-change="getTagList"
        @prev-click="getTagList"
        @next-click="getTagList"
        :total="list.totalCount">
      </el-pagination>
    </div>
  </div>

</template>

<script>


  export default {
    data() {
      return {
        list: [],
        page: 1,
        rows: 10
      }
    },
    created() {
      this.getTagList();
    },
    methods: {
      //获取标签列表数据
      async getTagList(page) {
        const resp = await this.$request().get(`/tag/list?page=${page || 1}`);
        this.list = resp.data;
      },
      //新增
      addOrUpdateDialog(id, initVal) {
        this.$prompt('输入标签名称', '提示', {
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
          "tagName": value
        };
        let resp = null;
        if (id) {
          resp = await this.$request().put('/tag/update', params);
        } else {
          resp = await this.$request().post('/tag/add', params);
        }

        if (resp) {
          this.$message({
            type: 'success',
            message: resp.data.msg
          });
          this.getTagList();
        }
      },
      //更新
      update(id, name) {
        this.addOrUpdateDialog(id, name);
      },
      //删除
      deleted(id) {
        this.$confirm('确定要删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.categoryName,
          type: 'warning'
        }).then(() => {

          let resp = this.$request().delete('/tag/delete?ids=' + id);
          if (resp) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTagList();
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
