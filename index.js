const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const videosFilePath = path.join(__dirname, 'videos.json');

function readVideoDataFromFile() {
    const data = fs.readFileSync(videosFilePath);
    return JSON.parse(data);
}

function writeVideoDataToFile(data) {
    const json = JSON.stringify(data);
    fs.writeFileSync(videosFilePath, json);
}