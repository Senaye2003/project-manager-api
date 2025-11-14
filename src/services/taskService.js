import {
    getAll
} from '../repositories/taskRepo.js';

export async function getAllTasks() {
    return await getAll();
}