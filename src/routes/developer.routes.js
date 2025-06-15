import express from 'express';
import DeveloperController from '../controllers/developer.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendResponse(200, { message: "Developer route" });
});

router.post('/create', DeveloperController.create);


export default router;