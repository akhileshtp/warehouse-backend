import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/task.controller.js';
// import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create a new task in DB
router.post('/create',createTask );

//Update task in DB
router.put('/update/:id',updateTask );

//Get all the tasks from DB
router.get('/getAll', getAllTasks);

//Delete task from DB
router.delete("/deleteRole/:id", deleteTask);

export default router;