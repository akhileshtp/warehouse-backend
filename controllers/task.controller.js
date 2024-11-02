import Task from '../models/Task.js';
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

export const createTask = async (req, res, next) => {
    try {
        console.log("Incoming Request Data:", req.body); // Debugging line

        if (req.body.task && req.body.task !== '') {
            const newtask = new Task(req.body);
            await newtask.save();
            return next(CreateSuccess(200, "Task Created!"))
        } else {
            return next(CreateError(400, "Bad Request"));
        }
    } catch (error) {
        console.error("Error in createTask:", error); // Log the error
        return next(CreateError(500, "Internal Server Error!"));
    }
}


export const updateTask = async (req, res, next) => {
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    try {
        // Attempt update operation
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        // Check if task was found and log the result
        if (updatedTask) {
            console.log("Task Updated Successfully:", updatedTask);
            return res.status(200).json({
                message: "Task Updated!",
                task: updatedTask
            });
        } else {
            console.log("Task Not Found with ID:", req.params.id);
            return res.status(404).json({ error: "Task not found!" });
        }
    } catch (error) {
        console.error("Error in updateTask:", error); // Detailed error logging
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};





export const getAllTasks = async (req, res, next)=>{
    try {
        const tasks = await Task.find({});
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(500).send("Internal Server Error!");
    }
}

export const deleteTask = async (req, res, next)=>{
    try {
        const taskId = req.params.id;
        const task = await Task.findById({_id: taskId});
        if(task){
            await Task.findByIdAndDelete(taskId);
            return res.status(200).send("Task deleted!");
        }else{
            return res.status(404).send("Task not found!");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error!");
    }
}

