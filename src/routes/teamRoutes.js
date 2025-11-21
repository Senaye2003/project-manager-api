import express from 'express';
import { getAllTeamsHandler, getTeamByIdHandler, createTeamHandler, updateTeamHandler, deleteTeamHandler } from '../controllers/teamController.js';
import { validateCreateTeam, validateUpdateTeam, validateTeamId } from '../middleware/teamValidators.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import { authorizeTeamMembership } from '../middleware/authorizeTeamMembership.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllTeamsHandler);
router.get('/:id', validateTeamId, authenticate, getTeamByIdHandler)
router.post('/', 
    authenticate,
    authorizeRole("MANAGER"), 
    validateCreateTeam, createTeamHandler)
router.put('/:id',  
    authenticate,
    validateTeamId,
    authorizeRole('MANAGER'), 
    authorizeTeamMembership,  
    validateUpdateTeam, updateTeamHandler)
router.delete('/:id',  
    authenticate,
    validateTeamId,
    authorizeRole('MANAGER'),
    authorizeTeamMembership,  
    deleteTeamHandler)

export default router;