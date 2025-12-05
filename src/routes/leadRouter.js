const express = require('express')
const leadRouter = express.Router()

const Lead = require('../models/leads')
// const fs = require("fs")

// const leadJsonData = fs.readFileSync("./src/data/leads.json")
// const leadJSON = JSON.parse(leadJsonData)

// const seedLeadData = async() => {
//     try{
//         for(const leadData of leadJSON){     
//             const lead = new Lead({
//                 name: leadData.name,
//                 source: leadData.source,
//                 salesAgent: leadData.salesAgent,
//                 status: leadData.status,
//                 tags: leadData.tags,
//                 timeToClose: leadData.timeToClose,
//                 priority: leadData.priority,
//                 closedAt: leadData.closedAt
//             })
//             await lead.save()
//         }
//     }
//     catch(err){
//         console.log("Unable to save data: ", err)
//     }
// }
// seedLeadData()

leadRouter.get('/leads', async(req, res) => {
    try{
        const leads = await Lead.find()
        res.status(200).json({message: 'Fetched leads successfully.', data: leads})
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }

})

module.exports = {leadRouter}