const express = require('express');
const app = express();
const cors = require('cors');
const videoRouter = require('./routes/videos')
require('dotenv').config();
const { PORT } = process.env;

app.use(cors());
app.use('/videos', express.static('public/images'));
app.use(express.json());

app.use('/videos', videoRouter);
app.use('/videos/:id', videoRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});