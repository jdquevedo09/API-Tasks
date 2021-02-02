const express = require('express');
const routes = require('./routes/taskRouter');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


//db connection 
require("./database/dbConfig")

// middlewares
app.use(express.json())
app.use(cors())//Que permita todos los llamados del local host
app.use(morgan('dev'))
app.use(routes) 



app.listen(3000, () => console.log("server running in port 3000"))