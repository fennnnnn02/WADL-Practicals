const mongoose = require('mongoose')
const express = require('express')

const app = express()

app.set('view engine','ejs')

app.use(express.json());

app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/music',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Successfully connected to database");
})
.catch((err)=>{
    console.log(err);
});

const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    director: String,
    singer: String
})

const songModel = mongoose.model('songdetail',songSchema);

const songs = [
    {
      songname: "Shape of You",
      film: "Divide",
      director: "Ed Sheeran",
      singer: "Ed Sheeran"
    },
    {
      songname: "Bohemian Rhapsody",
      film: "A Night at the Opera",
      director: "Queen",
      singer: "Freddie Mercury"
    },
    {
      songname: "Hotel California",
      film: "Hotel California",
      director: "Eagles",
      singer: "Eagles"
    },
    {
      songname: "Imagine",
      film: "Imagine",
      director: "John Lennon",
      singer: "John Lennon"
    },
    {
      songname: "Rolling in the Deep",
      film: "21",
      director: "Adele",
      singer: "Adele"
    }
  ]

// songModel.insertMany(songs)
//   .then(()=>{
//     console.log("Insertion success");
//   })
//   .catch((err)=>{
//     console.log(err);
//   })

app.get('/d',(req,res)=>{
    songModel.find()
        .then((found)=>{
            res.write("Total count of document is: "+ found.length+ "\n");
            res.write(JSON.stringify(found,null,2));
            res.end()
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
})

app.get('/ef',(req,res)=>{
    res.render('search')
})

app.post('/ef',(req,res)=>{
    songModel.find({director:req.body.director,singer:req.body.singer})
        .then((found)=>{
            //res.write(director)a
            console.log(found);
            res.write(JSON.stringify(found,null,2));
            res.end()
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
})

app.get('/g',(req,res)=>{
    res.render('delete')
})

app.post('/g',(req,res)=>{
    songModel.findOneAndDelete({songname:req.body.song})
        .then((found)=>{
            //res.write(director)a
            if(found){
                res.send(found);
                console.log("deletion successful");
            }
            else{
                console.log("deletion failed");
            }
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
})

app.get('/h',(req,res)=>{
    res.render('insert')
})

app.post('/h',(req,res)=>{
    songModel.insertMany([{songname:req.body.song, director:req.body.director, film:req.body.film, singer:req.body.singer}])
        .then((found)=>{
            //res.write(director)a
            if(found){
                res.send(found);
                console.log("deletion successful");
            }
            else{
                console.log("deletion failed");
            }
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
})

app.get('/i',(req,res)=>{
    songSchema.add({
        actor: String,
        actress: String
    })
})

app.get('/j',(req,res)=>{
    songModel.find()
        .then((found)=>{
            res.render('table',{found:found})
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
    
})

app.listen(3000,()=>{
    console.log("Server started on port 3000")
})