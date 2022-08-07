<template>
  <div class="container mt-5 container-custom container-fluid">
    <div class="card card-custom border-success">
      <div class="card-body">
        <h2>Login</h2>
        <div class="container">
            <div class="row mt-3">
                <div class="col-12 mb-3 text-start">
                    <p class="mb-0">Username</p>
                     <input v-model="data.username" placeholder="Enter Username" class="form-control" />
                     <span v-if="v$.username.$error" class="error-msg-custom" >
                       {{v$.username.$errors[0].$message}}
                    </span>
                </div>
                <div class="col-12 mb-3  text-start">
                     <p class="mb-0">Password</p>
                      <input v-model="data.password" type="password" placeholder="Enter Password" class="form-control" />
                       <span v-if="v$.password.$error"  class="error-msg-custom">
                       {{v$.password.$errors[0].$message}}
                    </span>
                </div>
                <div class="col-12 mb-3">
                    <button type="button" @click="onLogin()" class="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import setAuthHeader from "../utils/setAuthHeader"
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import {reactive, computed} from 'vue'
export default {
    setup(){
      const data = reactive({
         username:"",
          password:""
      })

       const validateData = computed(() =>{
         return{
           username: {required: helpers.withMessage('Username is required', required)},
          password: {required: helpers.withMessage('Password is required', required)}
         }
       })

       const v$ = useValidate(validateData,data)

       return{data,v$}
    },

   methods: {
    onLogin() {
       const credentials = {
           username: this.data.username,
           password:this.data.password
       }

       this.v$.$validate()
       if(!this.v$.$error){
           axios.post("https://candidate.neversitup.com/todo/users/auth",credentials)
          .then((res) => {
              localStorage.setItem('jwtToken',res.data.token)
                setAuthHeader(res.data.token)
                this.$router.push('home'); 
          })
          .catch((err) => alert(err))
       }
    
  
     console.log("username",credentials.username)
       console.log("password",credentials.password)
    },
   },
}
</script>
<style scoped>
.card-custom{
    width: auto;
}
.container-custom{
    width: 25rem !important;
}
.error-msg-custom{
  color: red;
}
</style>
