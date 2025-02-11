
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
app.use(cors());

// Create a connection to the SQL Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Corndogs787',
    database: 'houseApp'
});

// Create a connection to SQL
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err.stack);
        return;
    } 
    console.log('Connected to MySQL database as ID ' + connection.threadId);
});


// Handle the submit endpoint for the post method
app.post('/submit', (req, res) => {
    const formData = req.body;

    // Confirm if the formData has data (Always True)
    if (formData) {
        const query = 'INSERT INTO houseDetails(GrLivArea, TotalBsmtSF, GarageCars, YearBuilt, HouseAge, OverallQual, ExterQual_encoded, KitchenQual_encoded, BsmtQual_encoded) ' +
                      'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';

        connection.query(query, [
            formData.GrLivArea,
            formData.TotalBsmtSF,
            formData.GarageCars,
            formData.YearBuilt,
            formData.HouseAge,
            formData.OverallQual,
            formData.ExterQual_encoded,
            formData.KitchenQual_encoded,
            formData.BsmtQual_encoded
        ], (err, mysqlResult) => {
            if (err) {
                console.log('Error while inserting data to the database: ', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error inserting data into the database',
                    error: err,
                });
            };

            console.log('Data successfully received!: ', mysqlResult)

            return res.status(200).json({
                success: true,
                message: 'Data successfully received!',
                data: formData
            });
        });

    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid input'
        });
    };
});

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
});