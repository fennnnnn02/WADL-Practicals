const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.set('view engine','ejs')

const url = "mongodb://localhost:27017/students"

const marksSchema = new mongoose.Schema({
    name: String,
    rollno: Number,
    wad: Number,
    cc: Number,
    dsbda: Number,
    cns: Number,
    ai: Number
})

const Marksmodel = mongoose.model('Studentmark',marksSchema);

mongoose.connect(url,{useNewURLParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("Successfully connected to database")
    })
    .catch((err)=>{
        console.log(err);
    })



const students  = [
    {
        name: 'Abc',
        rollno: 1,
        wad: 14,
        cc: 13,
        dsbda: 10,
        cns: 22,
        ai:24
    },
    {
        name: 'Bcd',
        rollno: 2,
        wad: 12,
        cc: 13,
        dsbda: 20,
        cns: 12,
        ai:14
    },
    {
        name: 'Cde',
        rollno: 3,
        wad: 12,
        cc: 13,
        dsbda: 20,
        cns: 12,
        ai:14
    },
    {
        name: 'Def',
        rollno: 4,
        wad: 30,
        cc: 21,
        dsbda: 20,
        cns: 12,
        ai:24
    },
    {
        name: 'Efg',
        rollno: 5,
        wad: 12,
        cc: 23,
        dsbda: 2,
        cns: 9,
        ai:4
    }
]

// Insert array of documents in above Collection. [Document have
// following field:
// Name, Roll_No, WAD_Marks, CC_Marks,
// DSBDA_Marks,CNS_Marks,AI_marks] 

// Marksmodel.insertMany(students)
//     .then(()=>{
//         console.log("Insertion successfull")
//     })
//     .catch((err)=>{
//         console.log(err);
//     })




// Display total count of documents and List all the documents in
// browser.
app.get('/d',(req,res)=>{
    Marksmodel.find()
    .then((found)=>{
        res.write("Total count of documents: "+ found.length)
        res.write(JSON.stringify(found,null,2));
        res.end()
    })
    .catch((err)=>{
        console.log(err);
    })
})

// List the names of students who got more than 20 marks in DSBDA
// Subject in browser.
app.get('/e',(req,res)=>{
    Marksmodel.find()
    .then((found)=>{
        found.forEach((f1)=>{
            if(f1.dsbda>=20){
                res.write(JSON.stringify(f1,null,2));
            }
        })
        res.end();
    })
    .catch((err)=>{
        console.log(err);
    })
})


app.get('/j',(req,res)=>{
    Marksmodel.find()
    .then((found)=>{
        res.render('table',{found:found});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})