const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const videosFilePath = './data/videos.json';
function readVideosFile() {
    const videosList = fs.readFileSync(videosFilePath);
    return JSON.parse(videosList);
}

router.get('/', (req, res) => {
    const videos = readVideosFile();
    res.status(200).json(videos);
});

router.get('/:id', (req, res) => {
    const videos = readVideosFile();

    const video = videos.find((video) => video.id === req.params.id);
    if (video) {
        res.status(200).json(video);
    } else {
        res.status(404).json({ error: 'Video not found.' });
    }
})

router.post('/', (req, res) => {
    const videos = readVideosFile();
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "New Channel",
        image: "Upload-video-preview.jpg",
        description: req.body.description,
        views: "0",
        likes: "0",
        duration: "1:00",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []
    };
    videos.push(newVideo);
    fs.writeFileSync(videosFilePath, JSON.stringify(videos));
    res.status(201).json(newVideo);
});

module.exports = router;
