import express from 'express';
import { getAllTeamsHandler, getTeamByIdHandler, createTeamHandler, updateTeamHandler, deleteTeamHandler } from '../controllers/teamController.js';
import { validateCreateTeam, validateUpdateTeam, validateTeamId } from '../middleware/teamValidators.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import { authorizeMembership } from '../middleware/authorizeMembership.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, authorizeRole('MANAGER'), getAllTeamsHandler);
router.get('/:id', validateTeamId, authenticate, getTeamByIdHandler)
router.post('/', 
    authenticate, 
    authorizeMembership, 
    authorizeRole("MANAGER"), 
    validateCreateTeam, createTeamHandler)
router.put('/:id', validateTeamId, 
    authenticate, 
    authorizeMembership, 
    authorizeRole('MANAGER'), 
    validateUpdateTeam, updateTeamHandler)
router.delete('/:id', validateTeamId, 
    authenticate, 
    authorizeMembership, 
    authorizeRole('MANAGER'), 
    deleteTeamHandler)

export default router