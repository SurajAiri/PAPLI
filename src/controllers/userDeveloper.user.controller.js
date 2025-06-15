import UserDeveloperService from "../services/userDeveloper.service";

const UserDeveloperForUserController = {
    async getAll(req, res) {
        try {
        const { userId } = req.params;
        const { limit = 10, offset = 0 } = req.query;
        const userDevelopers = await UserDeveloperService.getAll(offset, limit, { userId });
        if (!userDevelopers || userDevelopers.length === 0) {
            return res.sendResponse(404, { message: "No user-developers found" });
        }
        const totalCount = await UserDeveloperService.count({ userId });
    
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
        const { userId, id } = req.params;
        const userDeveloper = await UserDeveloperService.getById(id);
        if (!userDeveloper || userDeveloper.userId !== userId) {
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
    
    // async update(req, res) {
    //     try {
    //     const { id } = req.params;
    //     const updateData = req.body;
    //     const updatedUserDeveloper = await UserDeveloperService.updateById(id, updateData);
    //     if (!updatedUserDeveloper) {
    //         return res.sendResponse(404, { message: "User-developer not found" });
    //     }
    //     return res.sendResponse(200, {
    //         message: "User-developer updated successfully",
    //         data: updatedUserDeveloper,
    //     });
    //     } catch (error) {
    //     return res.sendResponse(500, {
    //         message: "Error updating user-developer",
    //         error: error.message,
    //     });
    //     }
    // },
    
   
};

export default UserDeveloperForUserController;