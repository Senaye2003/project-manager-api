import {
    getAllTasks,
    createTask,
    updateTask,
} from '../services/taskService.js';

export async function getAllTasksHandler(req, res) {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
}

export async function createTaskHandler(req, res) {
    //convert dueDate to ISOstring so Prisma doesn't get mad (wants a full ISO8601)
    if (req.body.dueDate){
        const date = new Date(req.body.dueDate);
    }
    const task = {
        title: req.body.title,
        status: req.body.status,
        dueDate: date.toISOString(),
        projectId: req.body.projectId,
        assignedTo: req.body.assignedTo,
    };
    let newTask = await createTask(task);
    res.status(201).json(newTask);
}

export async function updateTaskHandler(req, res) {
    const id = parseInt(req.params.id);
    const updates = {};
    if (req.body.status){
        updates.status = req.body.status;
    }
    if (req.body.dueDate){
        //convert dueDate to ISOstring so Prisma doesn't get mad (wants a full ISO8601)
        const date = new Date(req.body.dueDate);
        updates.dueDate = date.toISOString();
    }
    if (req.body.assignedTo){
        updates.assignedTo = parseInt(req.body.assignedTo);
    }

    const updatedTask = await updateTask(id, updates);
    res.status(200).json(updatedTask);
}