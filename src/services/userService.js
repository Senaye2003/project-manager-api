import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findAll,
  findById,
  findByEmail,
  createUser,
  updateUser,
  deleteUser,
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
  if (!role) throw new Error('Role is required.');
  return updateUser(id, { role });
}

export async function removeUser(id) {
  return deleteUser(id);
}