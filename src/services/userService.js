import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findAll,
  findById,
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
  updateUserInfo
} from '../repositories/userRepo.js';

export async function signup(name, email, password, role = 'DEVELOPER') {
  if (!name || !email || !password) throw new Error('All fields are required.');

  const existing = await findByEmail(email);
  if (existing) throw new Error('Email already registered.');

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name,
    email,
    password: hashed,
    role,
  });

  return newUser;
}

export async function login(email, password) {
  const user = await findByEmail(email);
  if (!user) throw new Error('Invalid credentials.');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials.');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
}

export function getAllUsers() {
  return findAll();
}

export function getUserById(id) {
  return findById(id);
}

export async function updateUserRole(id, role) {
  const user = await findById(id);
  if (!user) {
    const error = new Error('Cannot find user');
    error.status = 404;
    throw error;
  }

  return updateUser(id, { role });
}

export async function removeUser(id) {
  const user = await findById(id);
  if (!user) {
    const error = new Error('Cannot find user');
    error.status = 404;
    throw error;
  }

  return deleteUser(id);
}

export async function updateCurrentUserInfo(userId, data) {
 
  if (!data.email && !data.password) {
    const error = new Error('At least one field (email or password) required');
    error.status = 400;
    throw error;
  }

  const updates = {};

  
  if (Object.prototype.hasOwnProperty.call(data, 'email')) {
    const email = data.email?.trim() || '';

    
    if (email === '') {
      const err = new Error('Email cannot be empty');
      err.status = 400;
      throw err;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const err = new Error('Invalid email');
      err.status = 400;
      throw err;
    }

    updates.email = email;
  }

  
  if (Object.prototype.hasOwnProperty.call(data, 'password')) {
    const password = data.password?.trim() || '';

    
    if (password.length < 8) {
      const err = new Error('Password too short');
      err.status = 400;
      throw err;
    }

    updates.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await updateUser(userId, updates);
  return updatedUser;
}
