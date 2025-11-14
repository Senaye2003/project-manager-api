import express from 'express';
import { getAllTeamsHandler, getTeamByIdHandler, createTeamHandler, updateTeamHandler, deleteTeamHandler } from '../controllers/teamController';

const router = express.Router();

router.get('/', getAllTeamsHandler);
router.get('/:id', getTeamByIdHandler)
router.post('/', createTeamHandler)
router.put('/:id', updateTeamHandler)
router.delete('/:id', deleteTeamHandler)

export default router