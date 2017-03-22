<template>
  <button :disabled="disabled" class="btn"
    :class="[
      type ? 'btn-' + type : '',
      size ? 'btn-' + size : ''
    ]"
    @click="handleClick"
  ><slot></slot>
  </button>
</template>
<script>
export default {
  name: 'TButton',
  props: {
    disabled: false,
    type:{
      type:String,
      default:'default'
    },
    size:{
      type:String,
      default:'large'
    }
  },
  methods: {
    handleClick(evt) {
      console.log('this'+evt);
    }
  }
}
</script>
<style>
button{
  padding:5px 15px;
  border:1px solid #ccc;
  border-radius:4px;
  background:rgba(0,0,0,.2);
  cursor:pointer;
}
button:focus{
  outline:none;
}
button:hover{
  border-color:#f90;
  background:rgba(255,255,0,.5);
}
</style>
