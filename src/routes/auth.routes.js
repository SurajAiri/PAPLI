import express from 'express';
import DeveloperAuthController from '../controllers/auth.developer.controller.js';

const router = express.Router();

router.post('/dev/google', DeveloperAuthController.googleAuth);

export default router;