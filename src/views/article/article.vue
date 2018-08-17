<template>
 <div class="article">
<vue-markdown :source="content" v-highlight></vue-markdown>
   <el-button type="primary" @click="close()">关闭</el-button>
 </div>
</template>

<script type="text/ecmascript-6">
import VueMarkdown from 'vue-markdown'
export default {
 data() {
 return {
     content:'## 1111\n```      \nasync fetchList(page) {\n        // if (!page) {\n        //   page = 1;\n        // }\n        const resp = await request.get(`category/list?page=${page || 1}`);\n        this.list = resp.data;\n      },\n\n```\n'

 }
 },
 components: {
     VueMarkdown
 },
 methods:{
     close(){
         this.$router.go(-1)
     }
 }
}
</script>

<style scoped lang="scss" type="text/scss">
</style>
