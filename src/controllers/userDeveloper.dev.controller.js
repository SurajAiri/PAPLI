import UserDeveloperService from "../services/userDeveloper.service.js";
import userDeveloperValidator from "../validators/userDeveloper.validators.js";

const UserDeveloperForDevController = {
  async create(req, res) {
    try {
      const data = req.body;
      const { error, value } = userDeveloperValidator.create.validate(data);
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const userDeveloper = await UserDeveloperService.create(value);
      if (!userDeveloper) {
        return res.sendResponse(500, {
          message: "Failed to create user-developer",
        });
      }
      return res.sendResponse(201, {
        message: "User-developer created successfully",
        data: userDeveloper,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error creating user-developer",
        error: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      const { projectId } = req.params;
      const { limit = 10, offset = 0 } = req.query;
      const query = { projectId };
      const userDevelopers = await UserDeveloperService.getAll(
        offset,
        limit,
        query
      );
      if (!userDevelopers || userDevelopers.length === 0) {
        return res.sendResponse(404, { message: "No user-developers found" });
      }
      const totalCount = await UserDeveloperService.count(query);

      return res.sendResponse(200, {
        message: "User-developers retrieved successfully",
        data: userDevelopers,
        totalCount,
        page: Math.ceil(totalCount / limit),
        currentPage: Math.ceil(offset / limit) + 1,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving user-developers",
        error: error.message,
      });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const userDeveloper = await UserDeveloperService.getById(id);
      if (!userDeveloper) {
        return res.sendResponse(404, { message: "User-developer not found" });
      }
      return res.sendResponse(200, {
        message: "User-developer retrieved successfully",
        data: userDeveloper,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving user-developer",
        error: error.message,
      });
    }
  },
  async updateById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const { error, value } = userDeveloperValidator.update.validate(data);
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const userDeveloper = await UserDeveloperService.updateById(id, value);
      if (!userDeveloper) {
        return res.sendResponse(404, { message: "User-developer not found" });
      }
      return res.sendResponse(200, {
        message: "User-developer updated successfully",
        data: userDeveloper,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error updating user-developer",
        error: error.message,
      });
    }
  },
  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await UserDeveloperService.deleteById(id);
      if (!deleted) {
        return res.sendResponse(404, { message: "User-developer not found" });
      }
      return res.sendResponse(200, {
        message: "User-developer deleted successfully",
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error deleting user-developer",
        error: error.message,
      });
    }
  },
};

export default UserDeveloperForDevController;
