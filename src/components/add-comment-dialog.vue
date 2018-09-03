<template>

</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: true,
        form: {
          parentId: '',
          comment: ''
        }
      }
    },
    props:{
      commentDialogVisible:{
        type:Boolean,
        default:false
      },
      commentId:{
        type:Number
      }
    },

    methods: {
      showDialog() {
        this.$emit('')
      },

    }
  }
</script>

<style scoped>

</style>
