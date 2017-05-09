<template>
  <header>
    <nav>
      <span>01</span>
      <span>02</span>
      <span>03</span>
      <span>04</span>
      <span>05</span>
    </nav>
  </header>
</template>

<script>
console.log(`header 组件!`);
export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!'
    }
  },
  methods: {
    fn:() =>{
      console.log('this');
    }
  }
}
</script>
<style>
nav span{
  vertical-align:middle;
  display:inline-block;
  padding:4px 12px;
  background:#eee;
  color:#f90;
  font-size:14px;
}
</style>