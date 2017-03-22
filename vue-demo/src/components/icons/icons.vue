<template>
  <span class="text-icon"
    :class="[
      color ? 'text-'+color : '',
      type ? 'icon-'+type:''
    ]"
  ></span>
</template>
<script>
export default {
  name: 'Icons',
  props: {
    color:{
      type:String,
      default:''
    },
    type:{
      type:String,
      required: true,
      default:'',
    }
  },
  methods: {}
}
</script>
<style>
</style>
