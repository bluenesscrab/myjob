<template>
  <section>
    <h1>{{notes}}</h1>
    <h2>{{notesAdd}}</h2>
    <button v-on:click="fnAdd">同步 buttons add</button>
    <button v-on:click="fnRemove">同步 buttons remove</button>

    <hr>

    <button v-on:click="fnAdd1">异步 buttons add 延时3m</button>
    <button v-on:click="fnRemove1">异步 buttons remove 延时3m</button>

    <hr>

    <button v-on:click="fnGetters">getters</button>
    <p>{{datas}}</p>
    <hr>

    <button @click="visible = true">dialog</button>
 
    <hsy-dialog class="confirm" v-model="visible">
      <div slot="title">Remove</div>
      <div slot="body">
        <div>This operation is irreversible, are you sure?</div>
        <div>
          <button @click="handleYes">Yes</button>
          <button>No</button>
        </div>
      </div>
    </hsy-dialog>

  </section>
</template>
<script>
import * as types from '../store/types'

export default {
  data() {
    return {
      visible: false,
      datas:'default'
    }
  },
  computed:{
    notes() {
      return this.$store.state.notes
    },
    notesAdd() {
      return this.$store.getters[types.NOTADD]
    }
  },
  watch:{
    notes(val) {
      console.log(`app.vue watch: ${val}`);
    }
  },
  methods: {
    fn: function () {
      console.log('this');
    },
    fnAdd() { //这里不能使用箭头函数会导致this指向问题
      this.$store.commit(types.ADD,'n');
    },
    fnRemove() {
      this.$store.commit(types.REMOVE,{a:1});
    },
    fnAdd1() {
      this.$store.dispatch(types.ACTION_ADD,'n');
    },
    fnRemove1() {
      this.$store.dispatch(types.ACTION_REMOVE,{a:1});
    },
    handleYes() {
      alert('Yes');
      this.visible = false
    },
    fnGetters(){
      this.datas = this.$store.getters[types.NOTADD]
    }
  }
}

</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>