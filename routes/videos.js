const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

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

function validateVideoData(data) {
    const { title, description } = data;
    if (!title || !description) {
        throw new Error('Title and description are required');
    }
    if (title.length > 100 || description.length > 500) {
        throw new Error('Title cannot be longer than 100 characters, and description cannot be longer than 500 characters');
    }
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
    try {
        validateVideoData(req.body);
        const data = readVideoDataFromFile();
        const video = {
            id: Math.random().toString(36).substr(2, 9),
            title: req.body.title,
            channel: 'My Channel',
            image: req.body.image,
            description: req.body.description
        };
        data.videos.push(video);
        writeVideoDataToFile(data);
        res.json(video);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});