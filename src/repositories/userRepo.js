import prisma from '../config/db.js';

export function findAll() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, updatedAt: true },
  });
}

export function findById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true
    }
  });
}

export function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export function createUser(data) {
  return prisma.user.create({ data });
}

export function updateUser(id, data) {
  return prisma.user.update({
    where: { id: Number(id) },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true
    }
  });
}

export function deleteUser(id) {
  return prisma.user.delete({
    where: { id: Number(id) },
    select: { id: true }
  });
}