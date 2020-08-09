import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const taskRouter = Router();

taskRouter.get('/', async (request, response) => {
  const userRequest = request.headers;
  const id = Number(userRequest.id);

  const tasks = await prisma.task.findMany({
    where: {
      userId: id
    }
  });

  return response.json(tasks);
});

taskRouter.post('/', async (request, response) => {
  const userRequest = request.headers;
  const { title, description } = request.body;

  const id = Number(userRequest.id);

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description, 
        user: {
          connect: {
            id,
          }
        }
      }
    });

    return response.status(200).json(task);
  } catch(err) {
    console.log(err);
  }
  return;
});

taskRouter.put('/', async (request, response) => {
  const taskRequest = request.headers;
  const { title, description } = request.body;

  const id = Number(taskRequest.id);

  const task = await prisma.task.update({
    where: {
      id
    },
    data: {
      title,
      description
    },
  });

  return response.status(200).json(task);
});

taskRouter.delete('/', async (request, response) => {
  const taskRequest = request.headers;
  const id = Number(taskRequest.id);

  await prisma.task.delete({
    where: { id }
  });

  return response.status(200).json({ ok: true });
});


export default taskRouter;