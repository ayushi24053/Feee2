const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Setting the views directory
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get("/welcome", (req, res) => {
    const username = req.query.username || "sam";
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? "Good Morning" : "Good Evening";
    res.render("index", { username, greeting });
});

// Route for To-Do List Page
app.get("/todo", (req, res) => {
    res.render("index2", { tasks });
});

// Add New Task
app.post("/addTask", (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect("/todo");
});

// Delete Task
app.post("/deleteTask", (req, res) => {
    const taskIndex = parseInt(req.body.taskIndex, 10);
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }
    res.redirect("/todo");
});

// Sample Products Array
const products = [
    { name: "Laptop", price: 1200 },
    { name: "Smartphone", price: 800 },
    { name: "Tablet", price: 400 },
    { name: "Headphones", price: 150 },
    { name: "Smartwatch", price: 250 }
];

// Products Route with Search Functionality
app.get("/products", (req, res) => {
    const searchQuery = req.query.search;
    let filteredProducts = products;

    if (searchQuery) {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    res.render("product", { products: filteredProducts });
});

// Sample Users Object
const users = {
    "john": { age: 25, hobby: "Football" },
    "jane": { age: 22, hobby: "Painting" },
    "sam": { age: 30, hobby: "Cooking" }
};

// Profile Route with Dynamic Username
app.get("/profile/:username", (req, res) => {
    const username = req.params.username.toLowerCase();
    const user = users[username];

    if (user) {
        res.render("profile", { username, age: user.age, hobby: user.hobby });
    } else {
        res.status(404).send("User not found");
    }
});

// Start Server
app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server listening on http://localhost:${PORT}`);
    }
});
