import prisma from '../config/db.js';

export async function getTeams(){
    return await prisma.team.findMany({
        select: {
            id: true,
            name: true,
            projects: {
                select: {
                    id: true
                }
            },
            members: true,
            createdAt: true
        }
    })
}

export async function getTeambyId(id){
    return await prisma.team.findUnique({
        where: {id},
        select: {
            id: true,
            name: true,
            projects: {
                select: {
                    id: true
                }
            },
            members: true,
            createdAt: true
        }
    })
}

export async function create(data){
    return await prisma.team.create({
        data: data, 
    })
}

export async function update(id, updates){
    try{
        return await prisma.team.update({
            where: {id},
            data: updateUser,
        })
    } catch (error) {
        if (error.code ==='P2025') return null;
        throw error;
    }
}

export async function remove(id){
    try {
        const deletedTeam = await prisma.team.delete({
            where: {id}
        })
        return deletedTeam;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}