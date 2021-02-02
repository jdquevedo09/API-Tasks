const { Router } = require('express') //Usamos router de Express
const taskRouter = Router();

const { getAllTasks, createTask, deleteTask, editTask, getTask } = require('../controllers/tasksController');


taskRouter.get('/tasks', getAllTasks)
taskRouter.post('/tasks', createTask) // Ruta Crear tarea 
taskRouter.delete('/tasks/:id', deleteTask) //Ruta para borrar
taskRouter.get('/tasks/:id',getTask) //Ruta para traer informacion al Form
taskRouter.put('/tasks/:id', editTask)//Ruta para editar

module.exports = taskRouter; //Exportamos nuestro Router