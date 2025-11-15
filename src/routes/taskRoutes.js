import express from 'express';

import {
    getAllTasksHandler,
    createTaskHandler,
    updateTaskHandler,
} from '../controllers/taskController.js';

//middleware
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import { 
    validateCreateTask,
     validateTaskId,
      validateUpdateTask 
} from '../middleware/taskValidators.js';

const router = express.Router();

//routes
//GET api/tasks -> return all tasks 
//Success response: 200
//Not authenticated: 401
router.get('/tasks', authenticate, getAllTasksHandler);

//POST api.tasks -> create a new task assigned to a team member (byId) for a specific project (byId)
//Managers only 
//Success response: 201
//Not authenticated: 401
//Not authorized: 403
//Invalid input: 400 (missing/invalid title, status, or projectId)
router.post('/tasks', authenticate, authorizeRole('MANAGER'), validateCreateTask, createTaskHandler);

//PATCH tasks/:id
//Managers only
//Success response: 200
//Not authenticated: 401
//Not authorized: 403
//Invalid input: 400 (invalid dueDate, status, assignedTo) STILL NEED TO IMPLEMENT
router.patch('/tasks/:id', validateTaskId, validateUpdateTask, authenticate, authorizeRole('MANAGER'), updateTaskHandler);

export default router;