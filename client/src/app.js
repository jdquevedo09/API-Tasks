const URL = "http://localhost:3000/tasks"

//Variable Global para diferenciar entre Edit y Create

/** Api funciones */


const fetchData = async (url, options = {}) => {

  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
// fetchData(URL)
// .then (data=>console.log(data))

/** FUNCTIONS*/

const taskCardHTML = (task) => {

  const taskCard = document.createElement('div')//Creamos el interfaz de la tarea
  taskCard.classList = 'col-md-3 py-3' //Bootstrap
  taskCard.innerHTML = `<div class="card"> 
  <div class="card-body" id="${task._id}">
    <h5 class="card-title">${task.title}</h5>
    <p class="card-text">${task.description}</p>
    <button class="btn btn-outline-primary btn-sm edit">Edit</button>
    <button class="btn btn-outline-danger btn-sm delete" >Delete</button>
  </div>
</div>`
  return taskCard
}


const getTasks = async () => {
  const tasks = await fetchData(URL) //Funcion para obtener la informacion 

  tasks.forEach(task => { //Formato para mostrar la tarea - ForEach- Para cada tarea hacer algo
    const taskCard = taskCardHTML(task)
    root.appendChild(taskCard)
  })

}
const createTask = async (evento) => {

  evento.preventDefault()
  const formTitle = evento.target.title.value //Valor de titulo
  const formDescription = evento.target.description.value //Valor de Descricion



  const options = {

    method: "POST",
    headers: {
      "content-type": "application/json" //Dice al servidor que lo que enviamos es un archivo de tipo JSON
    },
    body: JSON.stringify(//Lo convertimos formato JSON
      {
        title: formTitle, //Vienen del taskControllers - req.body los title y description
        description: formDescription
      }
    )


  }//Para nuestro Refact
  //console.log(evento.target.title.value) Verificar el valor del titulo
  //console.log(evento.target.description.value) Verificar el valor del comentario 
  const { response } = await fetchData(URL, options)
  if (response) {
    location.reload()
  }

  // fetch(URL, options)
  // .then(response=> response.json())
  // .then(data=>console.log(data))

}

const deleteTask = async (e) => {

  if (e.target.matches('.delete')) {
    const parent = e.target.parentNode //Buscamos el padre para posteriormente poder Borrar mediante FECTH DELETE
    console.log(parent.id)//EL ID de la tarea
    const option = {
      method: "DELETE",
      headers: {
        "content-type": "application/json" //Dice al servidor que lo que enviamos es un archivo de tipo JSON
      }
    }
    const { response } = await fetchData(URL + `/${parent.id}`, option)
    // fetch(URL + `/${parent.id}`, 
    // })
    if (response) {
      location.reload()
    }

  }

}



//Document elements

const root = document.getElementById('root')//Creamos elementos del documento
const form = document.getElementById('taskForm')




/**Listeners  */

document.addEventListener('DOMContentLoaded', getTasks)//Ejecuta una funcion en el momento en que se haya cargado la informacion del DOM

// form.addEventListener('submit', createTask)
form.onsubmit = createTask

document.addEventListener('click', deleteTask)

document.addEventListener('click', async (e) => {
  if (e.target.matches('.edit')) { //Ubica cuando le demos click a Edit
    const parent = e.target.parentNode //Para traer el ID
    const data = await fetchData(URL + `/${parent.id}`) //Usamos Fetch para traer la Data de la tarea


    const newTitle = document.getElementById("taskTitle") //Seleccionamos el Titulo del formulario
    const newDescription = document.getElementById("taskDescription") //Seleccionamos la descripcion del formulario

    
    newTitle.value = data.title //newTitle.value = El value de la casilla de title en nuestro Form - Data.title = La informacion de las Task que nos trae la base de datos mediante Fetch
    newDescription.value = data.description //newDescription.value = El value de la casilla de description en nuestro Form - Data.description = La informacion de las Task que nos trae la base de datos mediante Fetch

    const edit = () => {
      fetch(URL + `/${parent.id}`, { //URL de la tarea

        method: "PUT",
        headers: {
          "content-type": "application/json" //Dice al servidor que lo que enviamos es un archivo de tipo JSON
        },
        body: JSON.stringify( //Para volver JSON 
          {
            title: newTitle.value, //Valor del Titulo del Input
            description: newDescription.value //Valor de la Descripcion del Input
          }
        )
      })
    }
    form.onsubmit = edit
  }

})


//Refactor DElete
//Implementar Editar 
//Acceder a Task Tittle y Task Description del formulario de arriba


// form.addEventListener('submit', (e) => {

//   if (e.target.matches('.edit')) {// Buscar la clase del boton "EDIT"
//     const parent = e.target.parentNode //Seleccionar el padre de nuestra Card
//     const newTitle = document.getElementById("taskTitle")// Identificamos el titulo del Input
//     const newDescription = document.getElementById("taskDescription")// Identificamos la descripcion del Input
//     fetch(URL + `/${parent.id}`, { //URL de la tarea

//       method: "PUT",
//       headers: {
//         "content-type": "application/json" //Dice al servidor que lo que enviamos es un archivo de tipo JSON
//       },
//       body: JSON.stringify( //Para volver JSON 
//         {
//          title: newTitle.value, //Valor del Titulo del Input
//           description: newDescription.value //Valor de la Descripcion del Input
//         }
//       )



//     })
//     location.reload()

//   }

// })