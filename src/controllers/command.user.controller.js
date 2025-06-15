import CommandService from "../services/command.service.js";
import commandValidator from "../validators/command.validators.js";

const CommandForUserController = {
  async getAll(req, res) {
    try {
      const { userId } = req.params;
      const { limit = 10, offset = 0 } = req.query;
      const commands = await CommandService.getAllByUserId(
        userId,
        offset,
        limit
      );
      if (!commands || commands.length === 0) {
        return res.sendResponse(404, { message: "No commands found" });
      }
      const totalCount = await CommandService.count({ userId });

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
      const { userId, id } = req.params;
      const command = await CommandService.getById(id);
      if (!command || command.userId !== userId) {
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

  async updateStatus(req, res) {
    try {
      const { userId, id } = req.params;
      const { status } = req.body;
      const { error, value } = commandValidator.updateStatus.validate({
        status,
      });
      if (error) {
        return res.sendResponse(400, {
          message: "Validation error",
          error: error.details,
        });
      }
      const command = await CommandService.updateStatus(id, value.status);
      if (!command || command.userId !== userId) {
        return res.sendResponse(404, { message: "Command not found" });
      }
      return res.sendResponse(200, {
        message: "Command status updated successfully",
        data: command,
      });
    } catch (error) {
      return res.sendResponse(500, {
        message: "Error updating command status",
        error: error.message,
      });
    }
  },
};

export default CommandForUserController;
