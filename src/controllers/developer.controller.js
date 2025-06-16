import DeveloperService from "../services/developer.service.js";
import developerValidator from "../validators/developer.validators.js";

const DeveloperController = {
  // async create(req, res) {
  //   try {
  //     const data = req.body;
  //     // Validate data
  //     const { error, value } = developerValidator.create.validate(data);
  //     if (error) {
  //       return res.sendResponse(400, {
  //         message: "Validation error",
  //         error: error.details,
  //       });
  //     }
  //     const developer = await DeveloperService.create(value);
  //     if (!developer) {
  //       return res.sendResponse(500, { message: "Failed to create developer" });
  //     }

  //     return res.sendResponse(201, {
  //       message: "Developer created successfully",
  //       data: developer,
  //     });
  //   } catch (error) {
  //     return res.sendResponse(500, {
  //       message: "Error creating developer",
  //       error: error.message,
  //     });
  //   }
  // },
  // async getAll(req, res) {
  //   try {
  //     const { limit = 10, offset = 0 } = req.query;
  //     const developers = await DeveloperService.getAll(offset, limit);
  //     if (!developers || developers.length === 0) {
  //       return res.sendResponse(404, { message: "No developers found" });
  //     }
  //     const totalCount = await DeveloperService.count();

  //     return res.sendResponse(200, {
  //       message: "Developers retrieved successfully",
  //       data: developers,
  //       totalCount,
  //       page: Math.ceil(totalCount / limit),
  //       currentPage: Math.ceil(offset / limit) + 1,
  //     });
  //   } catch (error) {
  //     return res.sendResponse(500, {
  //       message: "Error retrieving developers",
  //       error: error.message,
  //     });
  //   }
  // },
  
  async getById(req, res) {
    try {
      const { id } = req.user;
      
      const developer = await DeveloperService.getById(id);
      if (!developer) {
        return res.sendResponse(404, { message: "Developer not found" });
      }
      return res.sendResponse(200, {
        message: "Developer retrieved successfully",
        data: developer,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving developer",
        error: error.message,
      });
    }
  },

  async updateById(req, res) {
    try {
      const { id } = req.user ;
      const data = req.body;
      const { error, value } = developerValidator.update.validate(data);
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const developer = await DeveloperService.updateById(id, value);
      if (!developer) {
        return res.sendResponse(404, { message: "Developer not found" });
      }
      return res.sendResponse(200, {
        message: "Developer updated successfully",
        data: developer,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error updating developer",
        error: error.message,
      });
    }
  },

  async deleteById(req, res) {
    try {
      const { id } = req.user;
      const result = await DeveloperService.deleteById(id);
      if (!result) {
        return res.sendResponse(404, { message: "Developer not found" });
      }
      return res.sendResponse(200, {
        message: "Developer deleted successfully",
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error deleting developer",
        error: error.message,
      });
    }
  },
};

export default DeveloperController;
