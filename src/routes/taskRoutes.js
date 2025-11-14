import express from 'express';
import {getAllTasksHandler} from '../controllers/taskController.js';

const router = express.Router();

//routes
//GET api/tasks -> return all tasks
router.get('/tasks', getAllTasksHandler);
//POST api.tasks -> create a new task assigned to a team member for a specific project
router.post('/tasks')

export default router;