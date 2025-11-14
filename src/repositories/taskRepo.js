import prisma from '../config/db.js';

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
            //only return the name field of the asignee
            assignee: {
                select: {
                    name: true
                }
            }
        }
    })

    return tasks;
}