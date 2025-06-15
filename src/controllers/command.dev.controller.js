import CommandService from "../services/command.service";
import commandValidator from "../validators/command.validators.js";

const CommandForDevController = {
  async create(req, res) {
    try {
      const data = req.body;
      const { error, value } = commandValidator.create.validate(data);
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const command = await CommandService.create(value);
      if (!command) {
        return res.sendResponse(500, { message: "Failed to create command" });
      }
      return res.sendResponse(201, {
        message: "Command created successfully",
        data: command,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error creating command",
        error: error.message,
      });
    }
  },
  async getAll(req, res) {
    try {
      const { projectId } = req.params;
      const { limit = 10, offset = 0 } = req.query;
      const commands = await CommandService.getAllByProjectId(
        projectId,
        offset,
        limit
      );
      if (!commands || commands.length === 0) {
        return res.sendResponse(404, { message: "No commands found" });
      }
      const totalCount = await CommandService.count({ projectId });

      return res.sendResponse(200, {
        message: "Commands retrieved successfully",
        data: commands,
        totalCount,
        page: Math.ceil(totalCount / limit),
        currentPage: Math.ceil(offset / limit) + 1,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving commands",
        error: error.message,
      });
    }
  },
  async getById(req, res) {
    try {
      const { id } = req.params;
      const command = await CommandService.getById(id);
      if (!command) {
        return res.sendResponse(404, { message: "Command not found" });
      }
      return res.sendResponse(200, {
        message: "Command retrieved successfully",
        data: command,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error retrieving command",
        error: error.message,
      });
    }
  },
};
export default CommandForDevController;
