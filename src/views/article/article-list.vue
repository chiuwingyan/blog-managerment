<template>
  <div class="article">
    <el-input
      placeholder="请输入文章标题"
      prefix-icon="el-icon-search"
      v-model="categoryTitile"
      style="width:20%;margin-bottom:30px;margin-right:10px">
    </el-input>
    <el-select v-model="categoryId" clearable filterable placeholder="文章分类">
      <el-option
        v-for="item in categoryList"
        :key="item.categoryId"
        :label="item.categoryName"
        :value="item.categoryId">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-table
      :data="list.data"
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
        label="更新时间"
      >
      </el-table-column>
      <el-table-column
        prop="publish"
        label="是否已发布"
        width="180">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.publish=== false ? 'primary' : 'danger'"
            close-transition>{{scope.row.publish === false?'否':'是'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.articleId)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="showConfirmDialog(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-count="list.pageCount"
      :current-page="list.page"
      :page-size="list.pageSize"
      layout="prev, pager, next"
      :total="list.totalCount"
      @current-change="fetchList"
    >
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        //分类id
        categoryId: '',
        //分类列表
        categoryList: [],
        categoryTitile: '',
        articleList: [],
        list: [],
        updateQuery: {},
        page: 1,
      }
    },

    created() {
      this.fetchList();
      this.fetchCategory();
    },
    methods: {
      async fetchList(page) {
        if (page)
          this.page = page;

        let resp = await this.$request().get(`article/list?page=${page || this.page}`);
        this.list = resp.data;
      },
      /**
       * 获取分类
       */
      async fetchCategory() {
        let resp = await this.$request().get('category/all');
        this.categoryList = resp.data;
      },
      currentPage() {

      },
      update(id) {
        console.log('id', id)
        this.$router.push({
          path: `/main/article/updateActicle/${id}`,
        })
      },

      /**
       * 二次确认按钮
       */
      showConfirmDialog(id) {
        this.$confirm('此操作将把文章移动到回收站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteByArticleId(id)
        });
      },

      /**
       * 移动到回收站
       * @param id
       * @returns {Promise<void>}
       */
      async deleteByArticleId(id) {
        let resp = await this.$request().delete('article/remove/' + id);
        if (resp.data.code === 1) {
          this.fetchList(1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message({
            type: 'error',
            message: resp.data.msg
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
</style>
