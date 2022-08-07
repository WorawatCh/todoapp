<template>
  <div class="container mt-5 container-custom container-fluid">
    <div class="card card-custom">
      <div class="card-body">
        <div class="container">
            <div class="row mt-3">
                <div v-if="todoList.length" class="col-12 mb-3">
                    <div  v-for="(todo, index) in todoList" :key="todo._id">
                        <div class="card card-custom-todo mb-3"  >
                             <div class="card-title text-end">
                                <button type="button" class="btn-close"  @click="onDelete(index)"></button>
                            </div>
                                <div class="card-body card-body-custom text-start"  @click="$refs.editTodo.getTodoById(todo._id)">
                                    <h2>{{todo.title}}</h2>
                                    <p>{{todo.description}}</p>
                                </div>
                            <div class="card-footer text-end">
                                    {{format_date(todo.updatedAt)}}
                            </div>
                        </div>
                    </div> 
                </div>
                <div v-else class="col-12">
                   <p>Empty press 'Create'</p>
                   <p>for add new todo</p>
               </div>
               <div class="col-12 mt-3 ">
                    <button type="button" class="btn btn-primary" @click="onShowCreateDialog()">
                        <div class="d-flex">
                            <span class="material-symbols-outlined">
                            add
                            </span>
                            Create
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <AddTodo @created="updateParent()"></AddTodo>
  <EditTodo @saved="updateParent()" ref="editTodo"></EditTodo>
  <DeleteTodo ref="deleteTodo" @deleted="updateParent()"></DeleteTodo>
  
</template>

<script>
import {onMounted, onUpdated, ref} from 'vue'
import axios from "axios"
import AddTodo from './AddTodo.vue'
import EditTodo from './EditTodo.vue'
import moment from 'moment'
import DeleteTodo from './DeleteTodo.vue'


export default {
  components: { AddTodo, EditTodo, DeleteTodo },
  setup() {
    const todoList = ref([])
    const todoById = ref()
     const deleteTodo = ref(null);

      function getTodo(){
        axios.get("https://candidate.neversitup.com/todo/todos")
       .then((res) => {
           if(res.status == 200){
            todoList.value = res.data
           }
       })
       .catch((err) => alert(err))
      }
    function format_date(value){
         if (value) {
           return moment(String(value)).format('DD-MM-YYYY')
          }
      }

    function onShowCreateDialog(){
      $('#AddModal').modal({
          backdrop: 'static',
          keyboard: false
      })
       $('#AddModal').modal('show')
    }
    function updateParent() {
        getTodo()
    }

       function onDelete(index){
        todoById.value = todoList.value[index]
        this.deleteTodo.getTodoById(todoById)
        console.log(todoById.value)
      }
      getTodo()
      
      
     return{todoList,onDelete,onShowCreateDialog,format_date,updateParent,todoById,deleteTodo}
  },
  methods:{
       
  }
}
</script>

<style scoped>
.card-custom, .card-custom-todo{
    width: auto;
}
.container-custom{
    width: 75rem !important;
}
.card-body-custom{
    cursor: pointer;
}
</style>
