import express from 'express';
import ProjectController from '../controllers/project.controller.js';

const router = express.Router();

router
  .route("/")
  .post(ProjectController.create)
  .get(ProjectController.getAll);

router
  .route("/:id")
  .get(ProjectController.getById)
  .patch(ProjectController.updateById)
  .delete(ProjectController.deleteById);

export default router;