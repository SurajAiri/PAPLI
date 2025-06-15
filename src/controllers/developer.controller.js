import DeveloperService from "../services/developer.service.js";
import developerValidator from "../validators/developer.validators.js";

const DeveloperController = {
    async create(req, res) {
        try {
            const data = req.body;
            // Validate data
            const { error, value } = developerValidator.create.validate(data);
            if (error) {
                return res.sendResponse(400, { message: "Validation error", error: error.details });
            }
            const developer = await DeveloperService.create(value);
            if (!developer) {
                return res.sendResponse(500, { message: "Failed to create developer" });
            }

            return res.sendResponse(201, { message: "Developer created successfully", data: developer });
        } catch (error) {
            return res.sendResponse(500, { message: "Error creating developer", error: error.message });
        }
    },
};

export default DeveloperController;