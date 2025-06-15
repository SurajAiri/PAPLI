const UserService = require('../services/user.service.js');
const userValidators = require('../validators/user.validators.js');

const UserController = {

    async create(req, res) {
        try {
            const data = req.body;
            const { error, value } = userValidators.create.validate(data);
            if (error) {
                return res.sendResponse(400, {
                    message: "Validation error",
                    error: error.details,
                });
            }
            const user = await UserService.create(value);
            if (!user) {
                return res.sendResponse(500, { message: "Failed to create user" });
            }
            return res.sendResponse(201, {
                message: "User created successfully",
                data: user,
            });
        } catch (error) {
            return res.sendResponse(500, {
                message: "Error creating user",
                error: error.message,
            });
        }
    },
    async getAll(req, res) {
        try {
            const { limit = 10, offset = 0 } = req.query;
            const users = await UserService.getAll(offset, limit);
            if (!users || users.length === 0) {
                return res.sendResponse(404, { message: "No users found" });
            }
            const totalCount = await UserService.count();

            return res.sendResponse(200, {
                message: "Users retrieved successfully",
                data: users,
                totalCount,
                page: Math.ceil(totalCount / limit),
                currentPage: Math.ceil(offset / limit) + 1,
            });
        } catch (error) {
            return res.sendResponse(500, {
                message: "Error retrieving users",
                error: error.message,
            });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params;
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
            const { id } = req.params;
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
            const { id } = req.params;
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