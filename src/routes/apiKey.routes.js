import express from "express";
import ApiKeyController from "../controllers/apiKey.controller.js";
import ProjectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", ApiKeyController.create);
router.get("/token/:token", ApiKeyController.getByToken);
// todo: change this getting from jwt token
router.get("/devId", ApiKeyController.getByDevId);
router.get(
  "/projectId/:projectId",
  ProjectController.validateProjectOwnership,
  ApiKeyController.getByProjectId
);

router
  .route("/:id")
  .delete(ApiKeyController.deleteById)
  .get(ApiKeyController.getById);

export default router;
