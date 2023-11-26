<template>
  <div
    :show="todos.length>0"
    class="col align-self-center"
  >
    <div
      v-for="todo in todos"
      :key="todo"
      class="form-row align-items-center"
    >
      <div class="col-auto my-1">
        <div class="input-group mb-3 todo__row">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <input
                v-model="todo.done"
                type="checkbox"
                :checked="todo.done"
                :value="todo.done"
                title="Mark as done?"
                @change="updateTodo(todo)"
              >
            </span>
          </div>
          <input
            v-model="todo.name"
            type="text"
            class="form-control"
            :class="todo.done?'todo__done':''"
            @keypress="todo.editing=true"
            @keyup.enter="updateTodo(todo)"
          >
          <div class="input-group-append">
            <div class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Delete todo?"
                @click="deleteTodo(todo._id)"
              >
                X
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="todos.length==0 && doneLoading"
      class="alert alert-primary todo__row"
    >
      Hardest worker in the room. No more todos now you can rest. ;)
    </div>
  </div>
</template>

<script>
import bus from '../bus.js';

export default {
  data() {
    return {
      todos: [],
      doneLoading: true,
    };
  },
  watch: {
    $route() {
      const self = this;
      self.doneLoading = false;
      self.fetchData().then(() => {
        self.doneLoading = true;
      });
    },
  },
  created() {
    this.fetchTodo();
    this.listenToEvents();
  },
  methods: {
    fetchTodo() {
      this.$http.get('/').then((response) => {
        this.todos = response.data;
      });
    },

    updateTodo(todo) {
      const id = todo._id;
      this.$http
        .put(`/${id}`, todo)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteTodo(id) {
      this.$http.delete(`/${id}`).then(() => {
        this.fetchTodo();
      });
    },

    listenToEvents() {
      bus.on('refreshTodo', () => {
        this.fetchTodo(); // update todo
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.todo__done {
  text-decoration: line-through !important;
}

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
</style>
