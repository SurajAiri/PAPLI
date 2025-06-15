import 'dotenv/config';
import express from 'express';
import responseFormatter from './src/middlewares/response.middlewares.js';
import mongoose from 'mongoose';
import router from './src/routes/index.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(responseFormatter);

app.use('/api/v1', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        console.error("db uri: ",process.env.MONGODB_URI);
    });