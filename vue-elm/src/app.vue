
<template>
  <div>
    <h1>{{ msg }}</h1>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="search">搜索</el-button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },

  methods: {
   
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
div{
  min-height:50px;
}
</style>