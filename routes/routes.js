const express = require('express');

const router = express.Router()
const dataSchema = require('../model/model');



//Post Method (create apis with mongoose)

router.post('/post', async (req, res) => {
    const data = new dataSchema({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get all Method Apis
router.get('/getAll', async (req, res) => {
    try{
        const data = await dataSchema.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Get by ID Method Apis
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await dataSchema.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Update by ID Method Apis
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await dataSchema.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method Apis
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dataSchema.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



module.exports = router;
