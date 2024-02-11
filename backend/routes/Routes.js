import  express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express.Router();

app.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const todo = await prisma.todo.create({
      data: { name, done: false },
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, done } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { name, done },
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

export default app;