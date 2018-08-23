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
            :key="item.id"
            :label="item.categoryName"
            :value="item.id">
          </el-option>
  </el-select>
  <tagSelect  @selectTagChange="selectTagChange" :myTags="selectedTag" :tags="tags"></tagSelect>
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
  this.fetchTagList()
  },
  data(){
    return {
      title:'',
      content:'',
      shortDesc:'',
      category:null,
      categoryList:[],
      tagList:[],
      selectedTag:[8],
      tags:[]

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
  //当选择的标签发生改变时，子组件的回调
  selectTagChange(newArr){
    this.selectedTag=newArr
  },
          async fetchTagList(){
            const resp = await this.$request().get(`tag/list?rows=${100}`);
            this.tags= resp.data.data;
            
        },
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


</style>
