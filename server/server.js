const express = require('express');
const pool = require('./database');
const cors = require('cors')


const port = process.env.PORT || 3000;
const app = express();



app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());



app.listen(port, () => {
    console.log("Server is listening to port " + port)
});




app.get('/api/courses', async(req, res) => {
    try {
        console.log("A get all request has arrived");
        const routes = await pool.query(
            "SELECT * FROM courses"
        );
        res.json(routes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/semesters/:semester', async(req, res) => {
    try {
        console.log("get a post with route parameter request has arrived");
        const { semester } = req.params;
        const courses = await pool.query(
            "SELECT * FROM courses WHERE semester = $1", [semester]
        );
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
    }
});