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

app.get('/videos', (req, res) => {
        const data = readVideoDataFromFile();
        const videos = data.videos.map(video => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image
        };
        });
        res.json(videos);
    });
    
    app.get('/videos/:id', (req, res) => {
        const id = req.params.id;
        const data = readVideoDataFromFile();
        const video = data.videos.find(video => video.id === id);
        if (!video) {
        res.status(404).send('Video not found');
        } else {
        res.json(video);
        }
    });
    
    app.post('/videos', (req, res) => {
        const data = readVideoDataFromFile();
        const video = {
        id: Math.random().toString(36).substr(2, 9),
        title: req.body.title,
        channel: 'My Channel',
        image: 'Upload-video-preview.jpg',
        description: req.body.description
        };
        data.videos.push(video);
        writeVideoDataToFile(data);
        res.json(video);
    });
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });