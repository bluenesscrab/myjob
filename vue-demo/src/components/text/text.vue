<template>
  <span
    :class="[
      color ? 'text-' + color : ''
    ]"
  ><slot></slot>
  </span>
</template>
<script>
export default {
  name: 'TText',
  props: {
    color:{
      type:String,
      default:'default'
    }
  },
  methods: {
    //handleClick(evt) {
    //  console.log('this'+evt);
    //}
  }
}
</script>
<style>
.text-default{
  color:#369;
  font-size:16px;
}
</style>
