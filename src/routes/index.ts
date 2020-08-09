import { Router } from 'express';

import taskRouter from './task.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/tasks', taskRouter);
routes.use('/users', userRouter);

export default routes;