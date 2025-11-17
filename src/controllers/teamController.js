import { findTeam, findTeambyId, createTeam, updateTeam, deleteTeam } from "../services/teamService.js";

export async function getAllTeamsHandler(req, res){
    const teams = await findTeam();
    res.status(200).json(teams);
}

export async function getTeamByIdHandler(req, res){
    const teamId = parseInt(req.params.id);
    const team = await findTeambyId(teamId);
    res.status(200).json(team)

}

export async function createTeamHandler(req, res){
    const data = {
        name: req.body.name,
        members: req.body.members
    };
    let newTeam = await createTeam(data);
    res.status(201).json(newTeam);
}

export async function updateTeamHandler(req, res){
    const id = parseInt(req.body.id)
    const updates = {}
    if (req.body.name) updates.name = req.body.name;
    if (req.body.members) updates.members = req.body.members;
    const updatedTeam = await updateTeam(id, updates)
    res.status(200).json(updatedTeam);
}

export async function deleteTeamHandler(req, res) {
    const id = parent=parseInt(req.body.id)
    await deleteTeam(id)
    res.status(204).send();
}