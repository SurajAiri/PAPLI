import ApiKeyService from "../services/apiKey.service.js";
import ApiKeyValidator from "../validators/apiKey.validators.js";
const ApiKeyController = {
  async create(req, res) {
    try {
      const data = req.body;
      const { error, value } = ApiKeyValidator.create.validate(data);

      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const apiKey = await ApiKeyService.create(value);

      if (!apiKey) {
        return res.sendResponse(500, { message: "Failed to create API key" });
      }
      return res.sendResponse(201, {
        message: "API key created successfully",
        data: apiKey,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error creating API key",
        error: error.message,
      });
    }
  },

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const result = await ApiKeyService.deleteById(id);
      if (!result) {
        return res.sendResponse(404, { message: "API key not found" });
      }
      return res.sendResponse(200, { message: "API key deleted successfully" });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error deleting API key",
        error: error.message,
      });
    }
  },

  async getByToken(req, res) {
    try {
      const { token } = req.params;
      const apiKey = await ApiKeyService.getByToken(token);
      if (!apiKey) {
        return res.sendResponse(404, { message: "API key not found" });
      }
      return res.sendResponse(200, {
        message: "API key retrieved successfully",
        data: apiKey,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving API key",
        error: error.message,
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const apiKey = await ApiKeyService.getById(id);
      if (!apiKey) {
        return res.sendResponse(404, { message: "API key not found" });
      }
      return res.sendResponse(200, {
        message: "API key retrieved successfully",
        data: apiKey,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving API key",
        error: error.message,
      });
    }
  },

  async getByDevId(req, res) {
    try {
      const { id:developerId } = req.user;
      const apiKeys = await ApiKeyService.getByDevId(developerId);
      if (!apiKeys || apiKeys.length === 0) {
        return res.sendResponse(404, {
          message: "No API keys found for this developer",
        });
      }
      return res.sendResponse(200, {
        message: "API keys retrieved successfully",
        data: apiKeys,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving API keys",
        error: error.message,
      });
    }
  },
  async getByProjectId(req, res) {
    try {
      const { projectId } = req.params;
      // todo: check if project belongs to same developer 

      const apiKeys = await ApiKeyService.getByProjectId(projectId);
      if (!apiKeys || apiKeys.length === 0) {
        return res.sendResponse(404, {
          message: "No API keys found for this project",
        });
      }
      return res.sendResponse(200, {
        message: "API keys retrieved successfully",
        data: apiKeys,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving API keys",
        error: error.message,
      });
    }
  },
};

export default ApiKeyController;
