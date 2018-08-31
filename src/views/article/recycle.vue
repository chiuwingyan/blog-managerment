<template>
  <div>
    <el-table :data="recycleListData"
              border
              style="width: 100%">

      <el-table-column
        prop="articleTitle"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="文章分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="restore(scope.row.articleId)" type="primary" plain size="small">恢复</el-button>
          <el-button type="danger" plain size="small" @click="showConfirmDialog(scope.row.articleId)">真正删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {

        recycleListData: []
      }
    },

    created() {
      this.getRecycleList();
    },

    methods: {

      /**
       * 获取回收站列表
       */
      async getRecycleList() {
        let resp = await this.$request().get('article/recycle/list');
        this.recycleListData = resp.data;
        console.log(this.recycleListData)
      },
      /**
       * 恢复到文章列表
       * @param id
       * @returns {Promise<void>}
       */
      async restore(id) {
        let resp = await this.$request().put('article/recycle/restore/' + id);
        if (resp.data.code === 1) {
          this.getRecycleList();
        }
      },

      /**
       * 二次确认按钮
       */
      showConfirmDialog(id) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.realDelete(id)
        });
      },
      /**
       * 逻辑删除文章
       * @param id
       * @returns {Promise<void>}
       */
      async realDelete(id) {
        let resp = await this.$request().delete('article/delete/' + id)
        if (resp.data.code === 1) {
          this.getRecycleList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: resp.data.msg
          });
        }
      }
    }
  }

</script>
<style>

</style>
