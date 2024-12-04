const express = require("express");

const TaskModel = require("../models/task.model");
const TaskController = require("./../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (err) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdates = ["isCompleted"];

        const requestedUpdates = Object.keys(taskData);

        for (update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            }
        }

        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDeleted = await TaskModel.findById(taskId);

        if (!taskToDeleted) {
            return res.status(404).send("Tarefa não encontrada");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const tasks = await TaskModel.findById(taskId);

        if (!tasks) {
            return res.status(404).send("Essa tarefa não foi encontrada");
        }

        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
