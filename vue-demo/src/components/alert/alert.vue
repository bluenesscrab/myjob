<template>
  <div class="alert"
  :class="[
    inline ? 'alert-inline' : 'alert',
    type ? 'alert-'+type : ''
  ]">
    <Icons :type="
      [
          (type == '' ? 'prompt-warning' : '')+
          (type == 'success' ? 'prompt-correct' : '')+
          (type == 'question' ? 'prompt-question' : '')+
          (type == 'error' ? 'prompt-failure' : '')
      ]
    " class="alert-type"/>
    <div class="alert-cont"><slot></slot></div>
    <a href="javascript:;" class="close">&#215;</a>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    inline:false,
    type:{
      type:String,
      default:'',
    }
  },
  methods: {}
}
</script>
<style>
</style>
