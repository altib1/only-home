const { Todo } = require('@prisma/client');

class TodoRepository {
  constructor() {
    this.client = new Todo({ url: process.env.POSTGRES_URL });
  }

  /**
   * @param {String} name
   */
  async create(name) {
    const newTodo = { name, done: false };
    return await this.client.todo.create({ data: newTodo });
  }

  async findAll() {
    return await this.client.todo.findMany();
  }

  /**
   * @param {Integer} id
   */
  async findById(id) {
    return await this.client.todo.findUnique({ where: { id } });
  }

  /**
   * @param {integer} id
   */
  async deleteById(id) {
    return await this.client.todo.delete({ where: { id } });
  }

  /**
   *
   * @param {integer} id
   * @param {*} object
   */
  async updateById(id, object) {
    return await this.client.todo.update({
      where: { id },
      data: { name: object.name, done: object.done },
    });
  }
}

module.exports = new TodoRepository();