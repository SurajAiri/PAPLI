require('dotenv').config();
const express = require('express');
const responseFormatter = require("./src/middlewares/response.middlewares");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(responseFormatter);

app.get('/', (req, res) => {
    res.sendResponse(200, { message: "Health Check for 'PAPLI' APIs." });
});

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