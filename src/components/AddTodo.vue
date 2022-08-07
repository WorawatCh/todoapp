<template>
    <div class="modal" id="AddModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add todo</h5>
                        <button type="button" class="btn-close" @click="onCancel()"></button>
                    </div>
                    <div class="modal-body text-start">
                        <form>
                            <div class="mb-3">
                                <label  class="form-label required">Title</label>
                                <input v-model="data.title" type="text" id="inputTitle" class="form-control">
                                 <span v-if="v$.title.$error" class="error-msg-custom" >
                                    {{v$.title.$errors[0].$message}}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Description</label>
                                <textarea v-model="data.description" class="form-control"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger" @click="onCancel()">Cancel</button>
                        <button type="submit" @click="createTodo()"  class="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from "axios"
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import {reactive, computed} from 'vue'
export default {
    setup() {
        const data = reactive({
                title: "",
                description: ""
            })

       const validateData = computed(() =>{
         return{
           title: {required: helpers.withMessage('Title is required', required)},
         }
       })

       const v$ = useValidate(validateData,data)

      return {data,v$}
    },
    methods:{
        createTodo(){
            const dataJson = {
                title: this.data.title,
                description:this.data.description
            }

            this.v$.$validate()
            if(!this.v$.$error){
                console.log("result",dataJson)
             axios.post("https://candidate.neversitup.com/todo/todos",dataJson)
            .then((res) => {
                  this.$emit('created', true)
                  $('#AddModal').modal('hide')
            })
           .catch((err) => alert(err))
             }
        },
        onCancel(){
            this.data.title = ""
            this.data.description = ""
            $('#AddModal').modal('hide')
        }
    }
}
</script>

<style scoped>
#AddModal{
    top: 15%;
}
.error-msg-custom{
  color: red;
}
</style>