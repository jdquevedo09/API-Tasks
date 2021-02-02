const { Schema , model } = require('mongoose');


const TaskSchema= new Schema({
title: {
    type: String
},
description: {
    type: String
},
status: {
type: Boolean,
default: false
}
})

module.exports = model('Task', TaskSchema)