const express = require("express")
const Question = require("../model/QuizModal") // new
const router = express.Router()
const cors = require("cors");
router.use(cors());


router.get('/viewquestion',(req,res)=>{
    Question.find({},(err,item)=>{
        if(!err){
            if(item!=null){
                res.status(200)
                res.send(item)
            }
            else{
                res.status(404)
                res.send(err)
            }
        }
        else{
            res.status(404)
            res.send(err)
        }
    })
})


router.post('/calculatepercentage', async (req,res)=>{
    const data = req.body;

    const item = await Question.find({})

    var count = 0;
    for(var i=0;i<data.length;i++){
        for(var j=0;j<item.length;j++){
            if(data[i]._id==item[j]._id){
                if(data[i].answer == item[i].answer){
                    count++;
                }
            }
        }
    }

    var percentage = (count/data.length) * 100;

    res.send({message: percentage})

})

router.put('/updatequestion/:id',(req,res)=>{
    const updateObj = {
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer:  req.body.answer
    }
    Question.findByIdAndUpdate({_id:req.params.id},{$set:updateObj},{new:true},(err,item)=>{
        if(!err){
            if(item!=null){
                res.status(200)
                res.send(item)
            }
            else{
                res.status(404)
                res.send(err)
            }
        }
        else{
            res.status(404)
            res.send(err)
        }
    })
})


router.get('/viewquestByid/:id',(req,res)=>{
    Question.findById({_id:req.params.id},(err,item)=>{
        if(!err){
            if(item!=null){
                res.status(200)
                res.send(item)
            }
            else{
                res.status(404)
                res.send(err)
            }
        }
        else{
            res.status(404)
            res.send(err)
        }
    })
})


router.delete('/deletequestion/:id',(req,res)=>{
    Question.findByIdAndDelete({_id:req.params.id},(err,item)=>{
        if(!err){
            if(item!=null){
                res.status(200)
                res.send(item)
            }
            else{
                res.status(404)
                res.send(err)
            }
        }
        else{
            res.status(404)
            res.send(err)
        }
    })
})
router.post('/addquestion',(req,res)=>{
    const newObj = new Question({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer:  req.body.answer
    })

    newObj.save((err,item)=>{
        if(!err){
        res.status(201)
        res.send("Added successfully")
        }
        else{
        res.status(400)
        res.send(err)
        }
    })
})


module.exports = router