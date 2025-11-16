import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { checkIfTeamExists } from '../repositories/teamRepo.js'; //TODO: create teamRepo.js
import { checkIfUserExists } from '../repositories/userRepo.js'; //TODO: update userRepo.js

export const validateProjectId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Project id must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'name', 'startDate', 'endDate'];
const allowedSortOrders = ['asc', 'desc'];
export const validateProjectQuery = [
  query('search').optional().isString().withMessage('search must be a string'),

  query('sortBy')
    .optional()
    .isIn(allowedSortFields)
    .withMessage(`sortBy must be one of: ${allowedSortFields.join(', ')}`),

  query('sortOrder')
    .optional()
    .isIn(allowedSortOrders)
    .withMessage(`sortOrder must be one of: ${allowedSortOrders.join(', ')}`),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be 0 or a positive integer'),

  handleValidationErrors,
];

export const validateCreateProject = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('description')
    .exists({ values: 'falsy' })
    .withMessage('description is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description must be at least 10 characters'),

    // Default to a valid ProjectStatus enum value if status is omitted
    body('status')
    .optional()
    .customSanitizer((value) => (value === undefined || value === null || value === '' ? 'TO_DO' : value))
    .trim()
    .escape()
    .isString()
    .withMessage('status must be a string')
    .bail()
    .isIn(['TO_DO','IN_PROGRESS','UNDER_REVIEW','COMPLETE','CANCELLED'])
    .withMessage('status must be one of the allowed ProjectStatus values'),

    body('teamId')
    .exists({ values: 'falsy' })
    .withMessage('project must be assigned to a team')
    .bail()
    .trim()
    .escape()
    .isInt()
    .withMessage('teamId must be an integer')
    .custom(async (value) => {
      if (value && !(await checkIfTeamExists(value))) {
        throw new Error(`teamId: ${value} does not correspond to an existing team`);
      }
      return true;
      }),

    body('projectManagerId')
    .exists({ values: 'falsy' })
    .withMessage('project must be assigned a manager')
    .bail()
    .trim()
    .escape()
    .isInt()
    .withMessage('projectManagerId must be an integer')
    .custom(async (value) => {
      if (value && !(await checkIfUserExists(value))) {
        throw new Error(`projectManagerId: ${value} does not correspond to an existing user`);
      }
      return true;
      }),

  handleValidationErrors,
];

export const validateUpdateProject = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('status').exists({ values: 'falsy' }),
      body('endDate').exists({ values: 'falsy' }),
      body('teamId').exists({ values: 'falsy' }),
      body('projectManagerId').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (name, description, status, endDate, teamId, projectManagerId) must be provided',
    },
  ),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('description must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description must be at least 10 characters'),

    body('status')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('status must be a string')
    .bail()
    .isIn(['TO_DO','IN_PROGRESS','UNDER_REVIEW','COMPLETE','CANCELLED'])
    .withMessage('status must be one of the allowed ProjectStatus values'),

    body('endDate')
    .optional()
    .trim()
    .escape()
    .isDate()
    .withMessage('endDate must be a date')
    .bail(),

    body('teamId')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('teamId must be an integer')
    .custom(async (value) => {
      if (value && !(await checkIfTeamExists(value))) {
        throw new Error(`teamId: ${value} does not correspond to an existing team`);
      }
      return true;
      }),

    body('projectManagerId')
    .optional()
    .trim()
    .escape()
    .isInt()
    .withMessage('projectManagerId must be an integer')
    .custom(async (value) => {
      if (value && !(await checkIfUserExists(value))) {
        throw new Error(`projectManagerId: ${value} does not correspond to an existing user`);
      }
      return true;
      }),

  handleValidationErrors,
];
