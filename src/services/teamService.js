import { getTeams, getTeambyId, create, update, remove } from "../repositories/teamRepo";

export async function findTeam(){
    return await getTeams();
}

export async function findTeambyId(id){
    const team = await getTeambyId(id);
    if (team) return team;
    else {
        const error = new Error(`Cannot find team with id ${id}`)
        error.status = 404
        throw error;
    }
}

export async function createTeam(data){
    return await create(data);
}

export async function updateTeam(id, updates){
    const updatedPost = await update(id, updates);
    if (updatedPost) return updatedPost;
    else {
        const err = new Error(`Cannot find team with id ${id}`);
        err.status = 404;
        throw error;
    }
}

export async function deleteTeam(id){
    const deleted = await remove(id);
    if (deleted) return deleted
    else{
        const err = new Error(`Cannot find team with id ${id}`)
        err.status = 404;
        throw err;
    }
}