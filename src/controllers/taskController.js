import {
    getAllTasks,
    createTask,
} from '../services/taskService.js';

export async function getAllTasksHandler(req, res) {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
}

export async function createTaskHandler(req, res) {
    const task = {
        title: req.body.title,
        status: req.body.status,
        dueDate: req.body.dueDate,
        projectId: req.body.projectId,
        assignedTo: req.body.assignedTo,
    };
    let newTask = await createTask(task);
    res.status(201).json(newTask);
}