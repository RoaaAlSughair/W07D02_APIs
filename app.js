const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const toDos = [{ todo: "Wake-Up", isCompleted: false }, { todo: "Eat-Breakfast", isCompleted: false }];

app.get("/todos", (req,res) => {
    res.status(200);
    res.json(toDos);
});

app.post ("/create/todo", (req, res) => {
    const todo = req.body.todo;
    const isCompleted = req.body.isCompleted;
    toDos.push({todo, isCompleted});
   
    res.status(201);
    res.json("Todo added successfully");
});

app.put("/update/todo/:name", (req, res) => {
    
    const toUpdateTodo = req.params.name;
    toDos.find((element, index) => {
        if (element.todo === toUpdateTodo) {
            res.status(200);
            element.currentStatus = "In progress";
            res.json("todo updated successfully");
        }
    })
        res.status(404);
        res.json("todo is not found");
});

app.delete("/delete/todo/:name", (req, res) => {
    const toDeleteTodo = req.params.name;
    toDos.find((element, index) => {
        if (element.todo === toDeleteTodo) {
            res.status(200);
            toDos.splice(index, 1);
            res.json("todo deleted successfully");
        }
    })
        res.status(404);
        res.json("todo is not found");
});

app.put("/complete/todo/:name", (req, res) => {
    const toDeleteTodo = req.params.name;
    toDos.find((element, index) => {
        if (element.todo === toDeleteTodo) {
            res.status(200);
            element.isCompleted = true;
            res.json("todo completed successfully");
        }
    })
        res.status(404);
        res.json("todo is not found");
});

app.get("/completed/todos", (req, res) => {
    const completeToDos = toDos.filter((element, index) => {
        return element.isCompleted === true;
    });
    if (completeToDos.length === 0) {
        res.status(200);
        res.json("No completed todos");
    } else {
        res.status(200);
        res.json(completeToDos);
    }
})

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`);
});