const UserService = require('../services/user.service.js');
const userValidators = require('../validators/user.validators.js');

const UserController = {

    async getById(req, res) {
        try {
            const { id } = req.user;
            const user = await UserService.getById(id);
            if (!user) {
                return res.sendResponse(404, { message: "User not found" });
            }
            return res.sendResponse(200, {
                message: "User retrieved successfully",
                data: user,
            });
        } catch (error) {
            return res.sendResponse(500, {
                message: "Error retrieving user",
                error: error.message,
            });
        }
    },
    async updateById(req, res) {
        try {
            const { id } = req.user;
            const data = req.body;
            const { error, value } = userValidators.update.validate(data);
            if (error) {
                return res.sendResponse(400, {
                    message: "Validation error",
                    error: error.details,
                });
            }
            const user = await UserService.updateById(id, value);
            if (!user) {
                return res.sendResponse(404, { message: "User not found" });
            }
            return res.sendResponse(200, {
                message: "User updated successfully",
                data: user,
            });
        } catch (error) {
            return res.sendResponse(500, {
                message: "Error updating user",
                error: error.message,
            });
        }
    },
    async deleteById(req, res) {
        try {
            const { id } = req.user;
            const result = await UserService.deleteById(id);
            if (!result) {
                return res.sendResponse(404, { message: "User not found" });
            }
            return res.sendResponse(200, { message: "User deleted successfully" });
        } catch (error) {
            return res.sendResponse(500, {
                message: "Error deleting user",
                error: error.message,
            });
        }
    }
};

export default UserController;