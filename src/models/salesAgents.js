const mongoose = require("mongoose")

const salesAgentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/, 'Please enter valid email.']
    }
},
{timestamps: true}
)

module.exports = mongoose.model('SalesAgent', salesAgentSchema)