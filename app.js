const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

async function countFilesInRepository(owner, repo, path) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.length;
    } catch (err) {
        console.error('Error fetching repository contents:', err);
        throw err;
    }
}

async function countFilesAnime(ownerA, repoA, pathA) {
    const apiUrl = `https://api.github.com/repos/${ownerA}/${repoA}/contents/${pathA}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.length;
    } catch (err) {
        console.error('Error fetching repository contents:', err);
        throw err;
    }
}

app.get('/', async (req, res) => {
    const owner = 'Sstudios-Dev';
    const repo = 'image-core';
    const path = 'src/img';

    const ownerA = 'Sstudios-Dev';
    const repoA = 'image-core';
    const pathA = 'src/img-anime';

    try {
        const totalFiles = await countFilesInRepository(owner, repo, path);
        const totalFilesAnime = await countFilesAnime(ownerA, repoA, pathA);
        res.render('index', { totalFiles, totalFilesAnime });
    } catch (err) {
        console.error('Error counting files in repository:', err);
        res.status(500).send('Error counting files');
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
