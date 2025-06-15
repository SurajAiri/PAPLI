import express from "express";
import ApiKeyController from "../controllers/apiKey.controller.js";

const router = express.Router();

router.post("/", ApiKeyController.create);
router.get("/token/:token", ApiKeyController.getByToken);
// todo: change this getting from jwt token
router.get("/devId/:developerId", ApiKeyController.getByDevId);
router.get("/projectId/:projectId", ApiKeyController.getByProjectId);

router
  .route("/:id")
  .delete(ApiKeyController.deleteById)
  .get(ApiKeyController.getById);


export default router;