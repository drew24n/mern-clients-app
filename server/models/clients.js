const mongoose = require('mongoose')

const clientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'is required'],
        trim: true,
        maxlength: [100, 'cannot be longer than 100 characters']
    },
    age: {
        type: Number,
        required: [true, 'is required']
    }
})

module.exports = mongoose.models.Clients || mongoose.model('Clients', clientsSchema)