const TaskModel = require("./../models/task.model");

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
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;
            const tasks = await TaskModel.findById(taskId);

            if (!tasks) {
                return res.status(404).send("Essa tarefa não foi encontrada");
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

            const taskToUpdate = await TaskModel.findById(taskId);

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

            const taskToDeleted = await TaskModel.findById(taskId);

            if (!taskToDeleted) {
                return this.res.status(404).send("Tarefa não encontrada");
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (err) {
            this.res.status(500).send(err.message);
        }
    }
}

module.exports = TaskController;
