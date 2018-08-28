<template>
  <div>
  <el-input v-model="title" placeholder="输入文章标题" class="title"></el-input>
    <mavon-editor v-model="content" :ishljs="true" @imgAdd="$imgAdd" ref=md ></mavon-editor>
    文章简介：<el-input
    type="textarea"
    :autosize="{ minRows: 3, maxRows: 3}"
    placeholder="请输入文章简介"
    v-model="shortDesc" class="shortDesc-input">
  </el-input>
    文章分类：<el-select v-model="category" filterable placeholder="请选择">
          <el-option
            v-for="item in categoryList"
            :key="item.categoryId"
            :label="item.categoryName"
            :value="item.categoryId">
          </el-option>
  </el-select>
  <tagSelect  @selectTagChange="selectTagChange" :myTags="selectedTag" ></tagSelect>
  <section class="comment">
    开启评论：<el-switch
    v-model="openComment"
    active-text="开启"
    inactive-text="关闭">
</el-switch>
  </section>
  <section class="btn"><el-button type="primary" class="comfirm" @click="release">发布文章</el-button>
    <el-button type="primary" plain @click="save" v-if="!publish">保存修改</el-button>
     <el-button v-if="$route.params.id" @click="back">返回</el-button>
  </section>
  </div>
  
</template>

<script>
import tagSelect from '@/components/tag-select'
export default {
  components:{
    tagSelect
  },
  created(){
  this.fetchCategoryList();
 // this.fetchTagList()
    if(this.$route.params.id){
    this.fetchActicleDetail(this.$route.params.id);
    }
  },
  data(){
    return {
      title:'',
      content:'',
      shortDesc:'',
      category:null,
      categoryList:[],
      tagList:[],
      selectedTag:[],
      tags:[],
      openComment:true,
      publish:false,
      articleId:null

    }
  },
  methods:{
  $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           let formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾
               $vm.$img2Url(pos, url);
           })
        },
  //获取分类目录 
  async fetchCategoryList(){
    console.log(this.$request)
    const resp = await this.$request().get(`category/list?rows=${100}`);
    this.categoryList = resp.data.data;
  },
  //获取文章详情
  async fetchActicleDetail(id){
    const resp = await this.$request().get(`article/info/${id}`);
    this.title=resp.data.mainTitle;
    this.content=resp.data.content;
    this.category = resp.data.categoryId;
    this.shortDesc=resp.data.shortDesc;
    this.openComment = resp.data.publish;
    this.articleId = resp.data.articleId;
    this.publish = resp.data.publish;
    this.selectedTag = resp.data.tagIds;
  },
  //当选择的标签发生改变时，子组件的回调
  selectTagChange(newArr){
    this.selectedTag=newArr
  },
          async fetchTagList(){
            const resp = await this.$request().get(`tag/list?rows=${100}`);
            this.tags= resp.data.data;
            
        },
  //发布文章
  async release(){
    let params = {
          "categoryId": this.category,
          "content": this.content,
          "mainTitle":this.title,
          "openComment":this.openComment,
          "shortDesc": this.shortDesc,
          "tagIds": this.selectedTag,
          "publish": true
        };

    let resp;
    if(this.$route.params.id){
      let idParams = { "articleId":this.articleId }
      Object.assign(params,idParams)
     resp = await this.$request().put('article/update',params)
    }else{
     resp = await this.$request().post('article/add',params)
    }
    if(resp.data.code === 1){
        this.$message({
          message: '发布成功',
          type: 'success'
        });
        this.$router.push('articleList');
      
    }else{
       this.$message.error('发布失败，请重试');
    }
  },
  //保存修改
 async save(){
    let params = {
          "categoryId": this.category,
          "content": this.content,
          "mainTitle":this.title,
          "openComment":this.openComment,
          "shortDesc": this.shortDesc,
          "tagIds": this.selectedTag,
          "publish": false
        };
   let resp;
    if(this.$route.params.id){
      let idParams = { "articleId":this.articleId }
      Object.assign(params,idParams)
      resp = await this.$request().put('/article/update',params)
    }else{
      resp = await this.$request().post('article/add',params)
    }
       if(resp.data.code === 1){
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.$router.push('articleList');
      
    }else{
       this.$message.error('保存失败，请重试');
    }
  },
  back(){
    this.$router.go(-1)
  }
        
  },
  computed:{

  }
}
</script>

<style lang="scss" scoped="" type="text/scss">
.v-note-wrapper{
  width: 100% !important;
  height: 600px !important;
  margin-bottom: 20px;
}
.title{
  margin-bottom: 20px;
  width: 15%;
}

.shortDesc-input{
  width: 20%;
  margin-right: 50px;
}
.comment{
  margin: 20px 0 40px 0;
}
.btn{
  margin:0 0 40px 60px;
  .el-button{
    margin-right: 60px;
  }
}

</style>
