import express from "express";
import {
    getTodoByID,
    getTodo,
    getSharedTodos,
    getUserByID,
    getUserByMail,
    createTodo,
    deleteTodo,
    toggleCompleted,
    shareTodo
} from "./database.js";

import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8081",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/todos/:id", async (req, res) => {
    const todos = await getTodoByID(req.params.id);
    res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req, res) => {
    const todo = await getSharedTodos(req.params.id);
    const author = await getUserByID(todo.user_id);
    const shared_with = await getUserByID(todo.shared_with_id);
    res.status(200).send({author, shared_with});
});

app.get("/users/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);
    res.status(200).send(user);
} );

app.put("/todos/:id", async (req, res) => {
    const {value}= req.body;
    const todo = await toggleCompleted(req.params.id, value);
    res.status(200).send(todo);
});

app.delete("/todos/:id", async (req, res) => {
    await deleteTodo(req.params.id);
    res.send ({message: "Todo deleted successfully"});
});

app.post("/todos/shared_todos", async (req, res) => {
    const {todo_id, user_id, mail} = req.body;
    const userToShare = await getUserByMail(mail);
    const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
    res.status(200).send(sharedTodo);
});

app.post("/todos", async (req, res) => {
    const {user_id, title} = req.body;
    const todo = await createTodo(user_id, title);
    res.status(201).send(todo);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
