import {getAllTasks} from '../services/taskService.js';

export async function getAllTasksHandler(req, res) {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
}