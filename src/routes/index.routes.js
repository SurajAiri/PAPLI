import express from 'express';
import  DeveloperRouter from './developer.routes.js';
import AuthRouter from './auth.routes.js';

const router = express.Router();

router.use('/dev', DeveloperRouter);
router.use('/auth',AuthRouter);


router.get('/', (req, res) => {
    res.sendResponse(200, { message: "Health Check for 'PAPLI' APIs." });
});

export default router;