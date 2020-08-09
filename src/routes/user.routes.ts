import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const tasks = await prisma.user.findMany();

  return response.json(tasks);
});

userRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const user = await prisma.user.create({
    data: {
      email,
      password
    }
  });

  return response.status(200).json(user);
});

userRouter.put('/', async (request, response) => {
  const userRequest = request.headers;
  const { email, password } = request.body;

  const id = Number(userRequest.id);

  const user = await prisma.user.update({
    where: {
      id
    },
    data: {
      email,
      password
    }
  });

  return response.status(200).json(user);  
});

userRouter.delete('/', async (request, response) => {
  const userRequest = request.headers;
  const id = Number(userRequest.id);

  const user = await prisma.user.delete({
    where: {
      id
    },
  });

  return response.status(200).json({ok:true});
});


export default userRouter;