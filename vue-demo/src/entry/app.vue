<template>
  <section>
    <h1>{{notes}}</h1>
    <h2>{{notesAdd}}</h2>
    <button v-on:click="fnAdd">buttons add</button>
    <button v-on:click="fnRemove">buttons remove</button>
  </section>
</template>
<script>
export default {
  computed:{
    notes() {
      return this.$store.state.notes
    },
    notesAdd() {
      return this.$store.getters.notesAdd
    },
  },
  methods: {
    fn: function () {
      console.log('this');
    },
    fnAdd(){//这里不能使用箭头函数会导致this指向问题
      this.$store.commit('ADD','n');
    },
    fnRemove(){
      this.$store.commit('REMOVE',{a:1});
    }
  }
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>