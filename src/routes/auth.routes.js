import express from 'express';
import googleAuthController from '../auth/google.auth.js';

const router = express.Router();

router.post('/google', googleAuthController);

export default router;