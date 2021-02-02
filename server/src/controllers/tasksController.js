const Task = require('../models/tasks')//Vamos a usar el modelo existente

//Primer controlador - para traer todas las tasks - async porque trabaja con la base de datos
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
        //console.log(tasks)
    } catch (error) {
        console.log('Error', error);
    }
}

//Crear nueva tarea - Controlador

const createTask = async (req, res) => {

    const { title, description } = req.body;
    const task = new Task({ title, description })
    try {
        await task.save()
        res.status(200).json({ response: true })
    } catch (error) {
        console.log('Error creating task', error)
    }
}


//Borrar tarea Controlador

const deleteTask = async (req, res) => {
    const { id } = req.params //Aqui esta el ID de la tarea
    try {
        const response = await Task.findByIdAndDelete(id)//Funcion para borrar
        //console.log(response)//Verificar que tome el ID
        res.status(200).json({ response: true })
    } catch (error) {
        console.log('Error deleting task', error)
    }
}

//Edit tarea Controlador

const editTask = async (req,res) => { 
    const { title, description } = req.body // Del body de la CARD recibe un title y una desc
    const {id} = req.params // Identificamos el Task por su ID
    try { 
    const response = await Task.findByIdAndUpdate(id, { title, description }) //Encontrando por el ID, y subiendo la nueva informacion al Model-DATABASE
    res.status(200).json({ response: true })
    } catch (error) {
        console.log('Error editando', error)
    }

}

//Get para Edit

const getTask = async (req,res) => {
    const { id } = req.params 
    try {
        const task = await Task.findById(id);
        res.status(200).json(task);
        console.log(task)
    } catch (error) {
        console.log('Error trayendo información')
    }
}



//Exportamos
module.exports = {
    getAllTasks, createTask, deleteTask, editTask, getTask
    
}