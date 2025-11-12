import express from 'express';
import {
  signupUser,
  loginUser,
  getUsers,
  getMe,
  updateRole,
  deleteUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// Public routes
router.post('/auth/signup', signupUser);
router.post('/auth/login', loginUser);

// Protected routes
router.get('/users', authenticate, getUsers);
router.get('/users/me', authenticate, getMe);
router.patch('/users/:id/role', authenticate, updateRole);
router.delete('/users/:id', authenticate, deleteUser);

export default router;