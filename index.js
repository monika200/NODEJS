const express = require("express")
const app = express();
//const bodyParser = require("body-parser");
//app.use(bodyParser.json())
const cors =   require("cors");
app.use(cors({
    origin:"https://condescending-nobel-66bb97.netlify.app/"
}))

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
//const dbUrl = "mongodb://localhost:27017"
const dbUrl = "mongodb+srv://MONIKA20:haachihaachi@cluster0.0saeo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.json())
//let students = []
//let mentors = []
 
 
app.get("/students",async(req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19");
        let students = await db.collection("students").find().toArray();
        client.close();
        res.json(students);
    } 
    catch(error){
        console.log(error);
        res.json({
        message : "something went wrong"
    })
    
}
})

 
// app.get("/mentors",(req,res)=>{
//     res.json(mentors)
// })
 
app.post("/student",async(req,res)=>{
try{
    let client = await mongoClient.connect(dbUrl);
    let db = client.db("b19");
    await db.collection("students").insertOne({name:req.body.name});
    client.close();
    res.json({
        message: "success"
    })
} catch (error) {
    console.log(error)
    res.json({
        message : "something went wrong"
    })
}
})
   // let studentData = {
      // name : req.body.name,
     //  id: students.length + 1
 //  }
  // students.push(studentData)
  // res.json({
   //    message: "success"
  // })

 
app.get("/student/:id",async(req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19");
        // in db it is object id and in params it is string.
        let id = mongodb.ObjectID(req.params.id)
        let students = await db.collection("students").findOne({_id:id});
        client.close();
        res.json(students);
    } 
    catch (error) {
        console.log(error)
        res.json({
            message : "something went wrong"
        })
    }
    })
   // if(students[req.params.id - 1]){
     ///   res.json(students[req.params.id - 1])
    //}else{
      //  res.json({
         //   message:"no record available"
       // })
    //}
 //})
 app.put("/student/:id",async(req,res)=>{
    try{
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("b19");
        // in db it is object id and in params it is string.
        let id = mongodb.ObjectID(req.params.id)
        await db.collection("students").updateOne({_id:id},{$set:{name:req.body.name}});
        client.close();
        res.json({
            message: "success"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message : "something went wrong"
        })
    }
    })
    
app.delete("/student/:id",async(req,res)=>{
        try{
            let client = await mongoClient.connect(dbUrl);
            let db = client.db("b19");
            // in db it is object id and in params it is string.
            let id = mongodb.ObjectID(req.params.id)
            await db.collection("students").findOneAndDelete({_id:id},{$set:{name:req.body.name}});
            client.close();
            res.json({
                message: "success"
            })
        } catch (error) {
            console.log(error)
            res.json({
                message : "something went wrong"
            })
        }
        })

 
let port = 3100
app.listen(process.env.PORT || port,()=>{
   console.log(`port open ${port}`)
})
