const express = require("express");

const TaskModel = require("../models/task.model");
const TaskController = require("./../controllers/task.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).insert();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).delete();
});

module.exports = router;
