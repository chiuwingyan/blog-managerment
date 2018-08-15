<template>
  <div>
    <mavon-editor v-model="value" :ishljs="true" @imgAdd="$imgAdd" ref=md ></mavon-editor>
  </div>
  
</template>

<script>
import request from 'utils/request' 
export default {
  mounted(){
    console.log($vm)
  },
  data(){
    return {
      value:''
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
        }
  },
  computed:{

  }
}
</script>

<style lang="scss" scoped="" type="text/scss">
.v-note-wrapper{
  width: 100% !important;
  height: 800px !important;
}
</style>
