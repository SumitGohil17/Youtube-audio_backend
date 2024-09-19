const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// Set the path to ffmpeg if it's not in the default PATH
const ffmpegPath = 'D:/cheat/ffmpeg-6.1.1-essentials_build/bin/ffmpeg.exe';
ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/convert', async (req, res) => {
    const { url } = req.body;
    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const outputFileName = `${uuidv4()}.mp3`;
    const outputPath = path.resolve('/tmp', outputFileName); // Changed to use /tmp for temporary storage

    const stream = ytdl(url, {
        quality: 'highestaudio',
        requestOptions: {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        }
    });

    ffmpeg(stream)
        .audioBitrate(128)
        .on('end', () => {
            res.download(outputPath, outputFileName, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to download file' });
                }
                fs.unlink(outputPath, (err) => {
                    if (err) console.error(err);
                });
            });
        })
        .on('error', (err) => {
            console.error('An error occurred: ', err);
            res.status(500).json({ error: 'An error occurred during conversion' });
            fs.unlink(outputPath, (err) => {
                if (err && err.code !== 'ENOENT') console.error(err);
            });
        })
        .save(outputPath);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});