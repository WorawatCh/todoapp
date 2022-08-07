<template>
    <div class="modal" id="DeleteModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body text-start">
                        <form class="mt-3 ms-3">
                           <p>Want to delete {{todoById.title}}</p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" @click="onDeleteToDo()"  data-bs-dismiss="modal" class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import {ref} from 'vue'
import axios from "axios"

export default {
    setup(props,{emit}) {
        const todoById = ref({})

        function getTodoById(data){
              $('#DeleteModal').modal({
                backdrop: 'static',
                keyboard: false
            })
              $('#DeleteModal').modal('show')
              console.log("data",data)
              todoById.value = data.value
            //   console.log("todoById",todoById)
        }

        function onDeleteToDo(){
            axios.delete("https://candidate.neversitup.com/todo/todos/" + todoById.value._id)
            .then((res) => {
                emit('deleted', true)
            })
           .catch((err) => alert(err))
        }
      return {getTodoById,todoById,onDeleteToDo}
    },
}
</script>

<style scoped>
#DeleteModal{
    top: 30%;
}
.modal-footer{
    border-top: none !important;
}
</style>