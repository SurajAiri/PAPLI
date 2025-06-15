import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
    res.sendResponse(200, { message: "api key route" });
});


export default router;