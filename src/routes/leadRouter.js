const express = require('express')
const leadRouter = express.Router()

const Lead = require('../models/Leads')
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
//         .log("Unable to save data: ", err)
//     }
// }
// seedLeadData()

leadRouter.get('/leads', async(req, res) => {
    try{
        const leads = await Lead.find().populate("salesAgent","name")
        res.status(200).json(leads)
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });

    }

})

leadRouter.post('/leads', async(req, res) => {
    try{
        const {name, source, salesAgent, status, tags, timeToClose, priority} = req.body
        const addlead = new Lead({name, source, salesAgent, status, tags, timeToClose, priority})
        const lead = await addlead.save()
        if(!lead){
            res.status(404).json({message: 'Unable to save lead'})
        }
        res.status(200).json({message: 'Lead saved successfully', data: lead})
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

leadRouter.put("/leads/edit/:leadId", async(req, res) => {
    try{
        const updatedLead = await Lead.findByIdAndUpdate(req.params.leadId, req.body, {new: true})
                                      .populate("salesAgent", "name")
        if(!updatedLead){
            res.status(400).send('ERROR: ', err.message)
        }
        res.status(200).json(updatedLead)
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

leadRouter.get("/leads/allStatus", async(req, res) => {
    try{
        const statuses = await Lead.distinct("status")
        if(!statuses){
             res.status(400).send('ERROR: ', err.message)
        }
        res.status(200).json(statuses)
    }
     catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

leadRouter.patch("/leads/edit/status/:leadId", async(req, res) => {
    try{
        console.log("in patch")
        console.log(req.body)
        const updatedLead = await Lead.findByIdAndUpdate(req.params.leadId, {status: req.body.status}, {new:true})
        if(!updatedLead){
            res.status(400).send('ERROR: ', err.message)
        }
        res.status(200).json(updatedLead)

    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

leadRouter.delete("/lead/:leadId", async(req, res) => {
     try{
        const deletedLead = await Lead.findByIdAndDelete(req.params.leadId)
        if(!deletedLead){
            res.status(400).send('ERROR: ', err.message)
        }
        res.status(200).json(deletedLead)
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

module.exports = {leadRouter}