import ProjectService from "../services/project.service.js";
import projectValidator from "../validators/project.validators.js";

// also add validation for whether these projects belong to the developer
const ProjectController = {
  async create(req, res) {
    try {
      const data = req.body;
      const { id: developerId } = req.user;
      const { error, value } = projectValidator.create.validate(data);
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const project = await ProjectService.create({...value, developerId});
      if (!project) {
        return res.sendResponse(500, { message: "Failed to create project" });
      }
      return res.sendResponse(201, {
        message: "Project created successfully",
        data: project,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error creating project",
        error: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      const { id: developerId } = req.user;
      const { limit = 10, offset = 0 } = req.query;
      const projects = await ProjectService.getAll(offset, limit, developerId);
      if (!projects || projects.length === 0) {
        return res.sendResponse(404, { message: "No projects found" });
      }
      const totalCount = await ProjectService.count();

      return res.sendResponse(200, {
        message: "Projects retrieved successfully",
        data: projects,
        totalCount,
        page: Math.ceil(totalCount / limit),
        currentPage: Math.ceil(offset / limit) + 1,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving projects",
        error: error.message,
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const project = await ProjectService.getById(id);
      if (!project) {
        return res.sendResponse(404, { message: "Project not found" });
      }

      return res.sendResponse(200, {
        message: "Project retrieved successfully",
        data: project,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving project",
        error: error.message,
      });
    }
  },
  async updateById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const { error, value } = projectValidator.update.validate(data);
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const project = await ProjectService.updateById(id, value);
      if (!project) {
        return res.sendResponse(404, { message: "Project not found" });
      }
      return res.sendResponse(200, {
        message: "Project updated successfully",
        data: project,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error updating project",
        error: error.message,
      });
    }
  },
  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const result = await ProjectService.deleteById(id);
      if (!result) {
        return res.sendResponse(404, { message: "Project not found" });
      }
      return res.sendResponse(200, { message: "Project deleted successfully" });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error deleting project",
        error: error.message,
      });
    }
  },

  //todo: Middleware to validate project ownership
  async validateProjectOwnership(req, res, next) {
    try {
      const { id: projectId } = req.params;
      const { id: developerId } = req.user;

      // todo: first check redis if the project exists
      // if not found in redis, then check the database

      const project = await ProjectService.getById(projectId);
      if (!project) {
        return res.sendResponse(404, { message: "Project not found" });
      }

      if (project.developerId.toString() !== developerId.toString()) {
        return res.sendResponse(403, {
          message: "You do not have permission to access this project",
        });
      }

      next();
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error validating project ownership",
        error: error.message,
      });
    }
  },
};

export default ProjectController;
