const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Text is required.']
    },
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: [true, 'Lead is required']
    },
    salesAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesAgent',
        required: [true, 'Sales Agent is required']
    }
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)