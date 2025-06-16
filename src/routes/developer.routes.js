import express from "express";
import DeveloperController from "../controllers/developer.controller.js";
import ApiKeyRouter from "./apiKey.routes.js"; 
import ProjectRouter from "./project.routes.js";
import DeveloperAuthController  from "../controllers/auth.developer.controller.js";
const router = express.Router();


router.use("/api-keys/",ApiKeyRouter);
router.use("/project/",ProjectRouter);

router
  .route("/")
  .get(DeveloperController.getById)
  .patch(DeveloperController.updateById)
  .delete(DeveloperController.deleteById);

export default router;
