<template>
  <div>

    <el-table
      :data="commentList.data"
      border
      style="width: 100%">
      <el-table-column
        prop="articleTitle"
        label="文章"
        width="180">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="评论内容">
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
          <el-button @click="showDialog(scope.row.id,scope.row.commentId)" type="primary" plain size="small">回复
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
        <el-form-item label="活动名称" label-width="50%">
          <el-input v-model="form.comment" aria-placeholder="请输入评论"></el-input>
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
  import addCommentDialog from '@/components/add-comment-dialog'

  export default {
    components: {
      addCommentDialog
    },
    data() {
      return {
        /**
         * 评论列表数据
         */
        commentList: [],
        commentDialogVisible: false,
        commentId: ''
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
      showDialog(val) {
        this.commentDialogVisible = true;
        this.commentId = val;
      },
      /**
       * 提交评论
       * @returns {Promise<void>}
       */
      async commitComment() {
        let param = {
          'parentId':this.commentId,

        };
        const resp = this.$request().post('/comment/add', param);
      }
    }
  }
</script>

<style scoped>

</style>
