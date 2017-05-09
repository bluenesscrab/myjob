<template>
  <div>
    header
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      account: '1123',
      password: 123
    }
  },
  methods: {
    fn () {
      console.log(this, 123)
    }
  }
}
</script>

<style>

</style>
