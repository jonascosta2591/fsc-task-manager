const TaskModel = require("./../models/task.model");
const {
    notFoundError,
    ObjectIdCastIdError,
} = require("./../errors/mongodb.erros");
const mongoose = require("mongoose");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (err) {
            this.res.status(500).send(error.message);
        }
    }

    async insert() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;

            if (!mongoose.Types.ObjectId.isValid(taskId)) {
                return ObjectIdCastIdError(this.res);
            }

            const tasks = await TaskModel.findById(taskId);

            if (!tasks) {
                return notFoundError(this.res);
            }

            this.res.status(200).send(tasks);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            if (!mongoose.Types.ObjectId.isValid(taskId)) {
                return ObjectIdCastIdError(this.res);
            }
            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ["isCompleted"];

            const requestedUpdates = Object.keys(taskData);

            for (let i = 0; i <= requestedUpdates.length - 1; i++) {
                if (allowedUpdates.includes(requestedUpdates[i])) {
                    taskToUpdate[requestedUpdates[i]] =
                        taskData[requestedUpdates[i]];
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;

            if (!mongoose.Types.ObjectId.isValid(taskId)) {
                return ObjectIdCastIdError(this.res);
            }

            const taskToDeleted = await TaskModel.findById(taskId);

            if (!taskToDeleted) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }
}

module.exports = TaskController;
