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
    <el-select v-model="publish" clearable filterable placeholder="是否已发布">
      <el-option
        key="true" 
        label="是"
        :value="true">
      </el-option>
      <el-option
        key="false"
        label="否"
        :value="false">
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-table
      :data="list.data"
      border
      style="width: 100%">
      <el-table-column
        prop="articleTitle"
        label="标题">
      </el-table-column>

      <el-table-column
        prop="categoryName"
        label="分类"
         width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
       >
      </el-table-column>
      <el-table-column
        align="center"
        prop="publish"
        label="是否已发布"
        width="120">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.publish=== false ? 'info' : 'success'"
          close-transition>{{scope.row.publish === false?'未发布':'已发布'}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="update(scope.row.articleId)" type="primary" plain size="small">编辑</el-button>
          <el-button type="danger" plain size="small" @click="deleted(scope.row.articleId)">删除</el-button>
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
        categoryTitile:'',
        articleList: [],
        list: [],
        updateQuery: {},
        page: 1,
        publish:null
      }
    },

    created() {
      this.fetchList();
      this.fetchCategory();
    },
    methods: {
      async fetchList(page) {
        if(page)
        this.page=page;

        let resp = await this.$request().get(`article/list?page=${page || this.page}`);
        this.list = resp.data.data;
      },
      /**
       * 获取分类
       */
      async fetchCategory() {
        let resp = await this.$request().get('category/all');
        this.categoryList = resp.data.data;
      },
      currentPage(){

      },
      //点击 编辑
      update(id){
        console.log('id',id)
        this.$router.push({
          path: `/main/article/articleList/updateActicle/${id}`,
        })
      },
      //删除文章
    deleted(id){
        this.$confirm('确定要删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.categoryName,
          type: 'warning'
        }).then(() => {
          this.confirmDelete(id)
        });
      },
        async confirmDelete(id){
          let resp = await this.$request().delete('article/delete/' + id);
          this.$message({
            type: resp===1?'success':'error',
            message: '删除成功!'
          });
          if (resp.code===1) {
            this.page = 1;
            console.log(this)
            this.fetchList();
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
