<template>
  <span class="loading"
  :class="[
    animate ? 'animate-loading':''
  ]"
  ></span>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    animate:false
  },
  methods: {

  }
}
</script>
<style>

</style>
