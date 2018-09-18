<template>
  <div>

    <el-table
      :data="commentList.data"
      border
      style="width: 100%">
      <el-table-column
        prop="articleTitle"
        label="文章"
        >
      </el-table-column>
      <el-table-column
        prop="comment"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="reply"
        label="状态">
        <template slot-scope="scope">
        <el-tag :type="scope.row.reply?'success':'danger'">{{scope.row.reply?'已回复':'未回复'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showDialog(scope.row.commentId,scope.row.articleId)" type="primary" plain size="small">回复
          </el-button>
          <el-button type="danger" plain size="small" @click="deleted(scope.row.id)">禁用</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-count="commentList.pageCount"
        :current-page="commentList.page"
        @current-change="getCommentList"
        @prev-click="getCommentList"
        @next-click="getCommentList"
        :total="commentList.totalCount">
      </el-pagination>

    </div>

    <el-dialog title="评论回复" :visible.sync="commentDialogVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.comment" type="textarea"
                    :rows="2"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitComment">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        /**
         * 评论列表数据
         */
        commentList: [],
        commentDialogVisible: false,

        /**
         * 评论id
         */
        commentId: '',
        /**
         * 文章id
         */
        articleId: '',
        form: {
          comment: ''
        }
      }
    }
    ,
    created() {
      this.getCommentList();
    }
    ,
    methods: {

      /**
       * 获取评论列表
       * @returns {Promise<void>}
       */
      async getCommentList(page) {

        const resp = await
          this.$request().get(`comment/list?page=${page || 1}`);
        if (resp.data.code === 1) {
          this.commentList = resp.data.data;
        }

      },
      showDialog(val, articleId) {
        this.commentDialogVisible = true;
        this.commentId = val;
        this.articleId = articleId;
      },
      /**
       * 提交评论
       * @returns {Promise<void>}
       */
      async commitComment() {
        let param = {
          'parentId': this.commentId,
          'articleId': this.articleId,
          'comment': this.form.comment
        };
        const resp = this.$request().post('/comment/add', param);
        if (resp.data.code === 1) {
          this.commentDialogVisible = false;
          this.getCommentList(1);
        }
        this.$message({
          type: resp.data.code === 1 ? 'success' : 'error',
          message: resp.data.msg
        })
      },

    }
  }
</script>

<style scoped>

</style>
