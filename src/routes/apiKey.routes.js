import express from "express";
import ApiKeyController from "../controllers/apiKey.controller.js";
import ProjectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", ApiKeyController.create);
// router.get("/token/:token", ApiKeyController.getByToken);
// todo: change this getting from jwt token
router.get("/all", ApiKeyController.getByDevId);
router.get(
  "/proj/:projectId",
  // ProjectController.validateProjectOwnership,
  ApiKeyController.getByProjectId
);

router
  .route("/:id")
  .delete(ApiKeyController.deleteById)
  // .get(ApiKeyController.getById);

export default router;
