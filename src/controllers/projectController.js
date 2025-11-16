import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projectService.js';

export async function getAllProjectsHandler(req, res) {
  const {
    search,
    sortBy = 'id',
    sortOrder = 'desc',
    limit = 10,
    offset = 0,
  } = req.query;

  const filter = {};
  if (search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.limit = parseInt(limit);
  filter.offset = parseInt(offset);

  let result = await getAllProjects(filter);
  res.status(200).json(result);
}

export async function getProjectByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let project = await getProjectById(id);
  res.status(200).json(project);
}

export async function createProjectHandler(req, res) {
  const data = {
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    startDate: req.body.startDate,
    teamId: req.body.teamId,
    projectManagerId: req.body.projectManagerId,
  };
  let newProject = await createProject(data);
  res.status(201).json(newProject);
}

export async function updateProjectHandler(req, res) {
  let id = parseInt(req.params.id);
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.description) updates.description = req.body.description;
  if (req.body.status) updates.status = req.body.status;
  if (req.body.startDate) updates.startDate = req.body.startDate;
  if (req.body.endDate) updates.endDate = req.body.endDate;
  if (req.body.teamId) updates.teamId = req.body.teamId;
  if (req.body.projectManagerId) updates.projectManagerId = req.body.projectManagerId;

  const updatedProject = await updateProject(id, updates);
  res.status(200).json(updatedProject);
}

export async function deleteProjectHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteProject(id);
  res.status(204).send();
}
