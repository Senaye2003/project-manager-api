import {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUserRole,
  removeUser,
} from '../services/userService.js';

export async function signupUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const user = await signup(name, email, password, role);
    res.status(201).json({ message: `User created with id ${user.id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ accessToken: token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMe(req, res) {
  try {
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateRole(req, res) {
  try {
    const updated = await updateUserRole(req.params.id, req.body.role);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await removeUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}