<template>
    <div class="modal" id="EditModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit todo</h5>
                        <button type="button" class="btn-close" @click="onCancel()"></button>
                    </div>
                    <div class="modal-body text-start">
                        <form>
                            <div class="mb-3">
                                <label  class="form-label required">Title</label>
                                <input v-model="dataById.title"  type="text" class="form-control">
                                 <span v-if="v$.title.$error" class="error-msg-custom" >
                                    {{v$.title.$errors[0].$message}}
                                </span>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Description</label>
                                <textarea v-model="dataById.description" class="form-control"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger" @click="onCancel()" >Cancel</button>
                        <button type="submit" @click="saveTodo()" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import {ref} from 'vue'
import axios from "axios"
import useValidate from '@vuelidate/core'
import {required,helpers} from '@vuelidate/validators'
import {reactive, computed} from 'vue'
export default {
    setup() {
        let dataById = ref([])

       const validateData = computed(() =>{
         return{
           title: {required: helpers.withMessage('Title is required', required)},
         }
       })

       const v$ = useValidate(validateData,dataById)

      return {dataById,v$,}
    },
    methods: {
        getTodoById(id){
            $('#EditModal').modal({
          backdrop: 'static',
          keyboard: false
      })
         $('#EditModal').modal('show')
        axios.get("https://candidate.neversitup.com/todo/todos/"+id)
        .then((res) => {
             this.dataById = res.data
             console.log(this.dataById)
        })
    //    .catch((err) => alert(err))
      },
         onCancel(){
          this.dataById.title = ""
            this.dataById.description = ""
            $('#EditModal').modal('hide')
      },
        saveTodo(){
             const dataJson = {
                title: this.dataById.title,
                description:this.dataById.description
            }
            this.v$.$validate()
            if(!this.v$.$error){
                 axios.put("https://candidate.neversitup.com/todo/todos/"+this.dataById._id,dataJson)
                .then((res) => {
                    this.$emit('saved', true)
                     $('#EditModal').modal('hide')
                })
                .catch((err) => alert(err))
            }
      }
    },
}
</script>

<style scoped>
#EditModal{
    top: 15%;
}
.error-msg-custom{
  color: red;
}
</style>