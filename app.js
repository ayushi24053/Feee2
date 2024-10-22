const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Store tasks in an array
let tasks = [];

// GET route for the /todo page
app.get('/todo', (req, res) => {
    res.render('todo', { tasks });
});

// POST route to add a new task
app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/todo');
});

// POST route to delete a task
app.post('/delete-task', (req, res) => {
    const taskToDelete = req.body.task;
    tasks = tasks.filter(task => task !== taskToDelete);
    res.redirect('/todo');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
