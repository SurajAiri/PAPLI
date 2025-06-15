import express from "express";
import DeveloperController from "../controllers/developer.controller.js";
import ApiKeyRouter from "./apiKey.routes.js"; 
import ProjectRouter from "./project.routes.js";

const router = express.Router();


router.use("/api-keys/",ApiKeyRouter);
router.use("/project/",ProjectRouter);

router
  .route("/")
  .post(DeveloperController.create);

router
  .route("/:id")
  .get(DeveloperController.getById)
  // todo: rather from jwt token
  .patch(DeveloperController.updateById)
  .delete(DeveloperController.deleteById);

export default router;
