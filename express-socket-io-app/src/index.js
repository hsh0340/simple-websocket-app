const express = require('express');
const path = require('path');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})