<template>
<div>
   <router-view></router-view>
</div>
</template>

<script>
import axios from 'axios'
    export default {
    data() {
      return {
        account : '',
        password : ''
      }
    },
    methods:{
      login() {
        // 获取已有账号密码
        axios.get(`/api/login/user?query=${'test'}`)
          .then((response) => {
            // 响应成功回调
            console.log(response)
            if(response.data.flag==1){
              this.account = 'aabbccc';
            }else{

            }
            // let params = { 
              // account : this.account,
              // password : this.password
            // };
            // 创建一个账号密码
            // return this.$http.post('/api/login/createAccount',params);
          })
          .catch((reject) => {
            console.log(reject)
          });
        }
      }
    }
</script>