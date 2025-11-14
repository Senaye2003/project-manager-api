import prisma from '../config/db.js';

//currently returns assignedTo (id of user the task, should also return the name)
export async function getAll(){
    const tasks = await prisma.task.findMany({
        select: {
            id: true,
            projectId: true,
            title: true,
            status: true,
            assignedTo: true,
            dueDate: true,

            createdAt: true,
            updatedAt: true,
            //only return the name and fields of the asignee
            assignee: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })

    return tasks;
}

export async function createT(task){
    const newTask = await prisma.task.create({
        data: task,
    });
    return newTask;
}