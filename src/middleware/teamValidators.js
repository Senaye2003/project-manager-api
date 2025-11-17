import { body, oneOf, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";
import { teamExist } from "../repositories/teamRepo.js";

export const validateTeamId = [
    param('id')
        .isInt({ min: 1}).withMessage('Team Id must be a positive integer'),
    
    handleValidationErrors,
]
export const validateCreateTeam = [
    body('name')
    .exists({ values: 'falsy'}).withMessage('name is required')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3}).withMessage('Name must be at least 3 characters long')
    .custom(async(value)=>{
        if (!value) return true;
        const exist = await teamExist(value)
        if (exist){
            throw new Error('Duplicate team name exists')
        }
        return true;
    }),

    body('project')
    .optional()
    .isArray().withMessage('Project must be an array of project IDs'),

    body('members')
    .optional()
    .isArray().withMessage('Members must be an array of user IDs'),

handleValidationErrors,
]

export const validateUpdateTeam = [
    oneOf(
        [
            body('name').exists({ values: 'falsy'}),
            body('project').exists({ values: 'falsy'}),
            body('members').exists({ values: 'falsy'})
        ],
        {
            message: 'At least one field (name, project, members) is required'
        },
    ),
    body('name')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3}).withMessage('Name must be at elast 3 characters long')
    .custom(async(value)=>{
        if (!value) return true;
        const exist = await teamExist(value)
        if (exist){
            throw new Error('Duplicate team name exists')
        }
        return true;
    }),

    body('project')
    .optional()
    .isArray().withMessage('Projects must be an array of project IDs'),

    body('members')
    .optional()
    .isArray().withMessage('Members must be an array of user IDs'),

handleValidationErrors,
]