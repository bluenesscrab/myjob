<template>
  <div>
    <h3>{{msg}}</h3>
    <TButton>???</TButton>
    <TText>test -> text</TText>
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
    fn:() =>{
      console.log('this');
    }
  }
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>