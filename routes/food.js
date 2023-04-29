const express = require("express");
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload")
const cors = require('cors');
const Food = require('../schema/Food');
const path = require('path');

const router = express();
router.use(express.json());
router.use(cors())
router.use(fileUpload())

router.post("/add", (req, res) => {
    // console.log(req.files.image_file); // image_file : --> is the ( KEY ) for -> files we have set up in the frontend 
    const {title, author, description} = req.body; // capturing body other than files
    console.log(title,author,description);
    const {image_file} = req.files; // req.files : is an Object that will have all the files , capturing here
    console.log(image_file)
    image_file.mv("./uploads/"+image_file.name, async (err) => { // concatinating relative path with file-name like : ./uploads/+image_file.name
        if(err) {
            res.json({
                message: err
            })
        }else {
            try {
                const data = await Food.create({
                    ...{title,author,description},image_file: image_file.name
                })
                 res.json({
                    message: "success",
                    data
                })
            }catch(err) {
                 res.json({
                    message: err.message
                    
                })
            }
        }
    }); // uploads is the folder where i will push file and image_file.name is the name of image with which i want to save the file

})

router.get("/all", async (req, res) => {
    try {
        const data = await Food.find();
        return res.json({
            status: "success",
            data
        })
    }catch(err) {
        return res.json({
            status: "failed"
        })
    }
})

router.get("/images/:fileName", async (req, res) => {
    console.log(`../uploads/${req.params.fileName}`)
    res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`))
})
module.exports = router;