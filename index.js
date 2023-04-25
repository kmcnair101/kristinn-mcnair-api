const express = require('express');
const cors = require('cors');
const videoRouter = require('./routes/videos');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/videos', express.static('public/images'));
app.use(express.json());

app.use('/videos', videoRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});