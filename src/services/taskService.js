import {
    getAll,
    createT,
} from '../repositories/taskRepo.js';

export async function getAllTasks() {
    return await getAll();
}

export async function createTask(task) {
    return await createT(task);
}