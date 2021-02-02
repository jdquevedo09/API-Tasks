const mongoose = require('mongoose');

const URL = "mongodb://127.0.0.1:27017/tasks";

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.once('open',()=>console.log('Database connected'))