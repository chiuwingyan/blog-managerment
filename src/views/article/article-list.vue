<template>
  <div class="article">
    <el-input
      placeholder="请输入文章标题"
      prefix-icon="el-icon-search"
      v-model="inputVal"
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
        prop="mainTitle"
        label="文章标题">
      </el-table-column>

      <el-table-column
        prop="categoryName"
        label="文章分类">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :page-count="list.pageCount"
      :current-page="list.page"
      layout="sizes, prev, pager, next"
      :total="list.totalCount">
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
        articleList: [],
        list: [],
        updateQuery: {},
        page: 1
      }
    },

    created() {
      this.fetchList();
      this.fetchCategory();
    },
    methods: {
      async fetchList(page) {
        let resp = await this.$request().get(`article/list?page=${page || 1}`);
        this.list = resp.data;
      },
      /**
       * 获取分类
       */
      async fetchCategory() {
        let resp = await this.$request().get('category/all');
        this.categoryList = resp.data;
      },
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
</style>
