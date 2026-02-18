const express = require('express')
const salesAgentRouter = express.Router()

const SalesAgent = require('../models/SalesAgents')

salesAgentRouter.get('/agents', async(req, res) => {
    try{
        console.log("in sales agent router............")
        const agents = await SalesAgent.find()
        console.log(agents)
        if(!agents){
            res.status(200).json({message: "No Agents found yet!!"})
        }
        res.status(200).json({message: "Fetched agents successfully", data: agents})
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

salesAgentRouter.post('/agents', async(req, res) => {
    try{
        const {name, email} = req.body
        const agent = new SalesAgent({name, email})
        console.log("saving.........", agent)
        const savedAgent = await agent.save()
        console.log("are we saving..........", savedAgent)
        if(!savedAgent){
            console.log("saved.....", savedAgent)
            res.status(404).json({message: 'Unable to save agent'})
        }
        res.status(200).json({message: 'Agent saved successfully.', data: savedAgent})
    }
    catch(err){
        console.log(err)
        if(err.code === 11000){
            return res.status(400).json({
                success: false,
                message: "Validation Error"  
            })
        }
        res.status(400).send('ERROR: ', err.message)
    }
}) 

module.exports = {salesAgentRouter}