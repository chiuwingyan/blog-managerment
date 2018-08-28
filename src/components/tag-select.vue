<template>
 <div class="tag-select">
     文章标签：
     <el-tag
        :key="tag.id"
        v-for="tag in filterTagName"
        closable
        :disable-transitions="false"
        @close="handleClose(tag.id)">
        {{tag.tagName}}
    </el-tag>
    <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="newTagInput"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  <el-checkbox-group v-model="myTags"  v-if="tags && tags.length>0">
    <el-checkbox v-for="tag in tags" :label="tag.id" :key="tag.id">{{tag.tagName}}</el-checkbox>
  </el-checkbox-group>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
created(){
    this.fetchTagList();
 //   this.selectedTag = this.myTags
    console.log(this.myTags)
},
props:{
    myTags:{
        type:Array,
        default:function () {
            return []
        }
    }
},
 data() {
 return {
     inputVisible:false,
     newTagInput:'',
     nowTagName:'',
     tags:[]
 }
 },
 watch:{
     myTags:function(){
         
         this.$emit('selectTagChange',this.myTags)
     }
 },
computed:{
    filterTagName(){
        let arr=[]
        this.myTags.filter((item) => {
            this.tags.filter((tag) => {
                if(item == tag.id){
                    arr.push(tag)
                }
            })
        })
        return arr
    }
},
 methods:{
       //获取标签目录
        async fetchTagList(){
            const resp = await this.$request().get(`tag/list?rows=${100}`);
            this.tags= resp.data.data;
            
        },
        //新增标签请求
        async addTag(){
        let params = {
            tagName:this.newTagInput
            };
        let resp = await this.$request().post('tag/add',params);
        this.myTags.push(resp.data.data.id);
        this.tags.push(resp.data.data)
        },
        handleInputConfirm(){
            if(this.newTagInput === "")  {
                this.inputVisible = false; 
                return;
            }
             debugger
            this.addTag();
            this.inputVisible = false;
        },
        handleClose(tag){
            this.myTags.splice(this.myTags.indexOf(tag),1);
        },
        showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

 }
}
</script>

<style scoped lang="scss" type="text/scss">
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .tag-select{
      margin-top: 30px;
      .el-checkbox-group{
          margin: 15px 0 0 83px;
          width: 480px;
          max-height:200px;
          padding: 10px;
          border:1px solid #DDDDDD;
          border-radius: 5px;
          overflow-x: hidden;
          overflow-y: auto;
          background:#FAFAFA;
          &::after{
              content: '.';
              visibility: hidden;
              clear: both;
          }
          .el-checkbox{
              float: left;
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              margin:0 16px 8px 0;
          }
      }
  }
</style>
