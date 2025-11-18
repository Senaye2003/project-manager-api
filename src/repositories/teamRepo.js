import prisma from '../config/db.js';

export async function getTeams(){
    return await prisma.team.findMany({
        select: {
            id: true,
            name: true,
            projects: {
                select: {
                    id: true,
                }
            },
            members: {
                select: {
                    id: true,
                }
            },
            createdAt: true
        }
    })
}

export async function getTeambyId(id){
    return await prisma.team.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            projects: {
                select: {
                    id: true,
                }
            },
            members: {
                select: {
                    id: true,
                }
            },
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
            where: { id },
            data: updates,
        })
    } catch (error) {
        if (error.code ==='P2025') return null;
        throw error;
    }
}

export async function remove(id){
    try {
        const deletedTeam = await prisma.team.delete({
            where: { id }
        })
        return deletedTeam;
    } catch (error) {
        if (error.code === 'P2025') return null;
        throw error;
    }
}

export async function isMember(teamId, userId) {
    const member = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId: teamId,
                userId: userId
            }, 
        },
    });
    return !!member;
}

export async function teamExist(name) {
    const idx = await prisma.team.findFirst({
        where: { name }
    });
    return !!idx;
}