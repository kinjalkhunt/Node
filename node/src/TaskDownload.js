// server.js
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/download', async (req, res) => {
    const url = 'https://example.com/file.pdf'; // Tame je URL thi file download karva ichho cho
    const filePath = path.resolve(__dirname, 'downloadedFile.pdf');
    
    const writer = fs.createWriteStream(filePath);
    
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    
    response.data.pipe(writer);
    
    writer.on('finish', () => {
        res.download(filePath);
    });
    
    writer.on('error', (err) => {
        res.status(500).send(err.message);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
