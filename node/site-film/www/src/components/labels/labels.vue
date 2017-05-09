<template>
  <span class="labels"
    :class="[
      color ? 'labels-'+color : ''
    ]"
  ><slot></slot></span>
</template>
<script>
export default {
  name: 'Labels',
  props: {
    color:{
      type:String,
      default:''
    }
  },
  methods: {}
}
</script>
<style>
</style>
