<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">
      Create todos
    </h3>
    <form
      class="sign-in"
      @submit.prevent
    >
      <div class="form-group todo__row">
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="What do you want to do?"
          @keypress="typing=true"
          @keyup.enter="addTodo($event)"
        >
        <small
          v-show="typing"
          class="form-text text-muted"
        >Hit enter to save</small>
      </div>
    </form>
  </div>
</template>
<script>
import bus from '../bus.js';

export default {
  data() {
    return {
      name: '',
      typing: false,
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      const todo = {
        name: this.name,
        done: false, // false by default
      };
      console.log(todo);
      this.$http
        .post('/', todo)
        .then(() => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    clearTodo() {
      this.name = '';
    },

    refreshTodo() {
      bus.emit('refreshTodo');
    },
  },
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>
