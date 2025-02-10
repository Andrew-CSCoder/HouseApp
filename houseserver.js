
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/submit', (req, res) => {
    const formData = req.body;

    if (formData) {
        res.status(200).json({
            success: true,
            message: 'Data Received',
            data: formData
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid input'
        });
    }
});

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
});