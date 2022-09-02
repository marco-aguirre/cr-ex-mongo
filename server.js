console.log('MAy the Node be with you')

const express = require('express');                 //tells server to use express
const bodyParser= require('body-parser');
const { application } = require('express');
const app = express();

//middle-wares
// Make sure you place body-parser before your CRUD handlers
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')                                   //sets render engine to use EJS
app.use(express.static('public'))                           //tells Express to make the public folder accessible to the public (middleware)
app.use(bodyParser.json())                                  //tells server to accept JSON data

const MongoClient = require('mongodb').MongoClient;
//I struggled to get my database to connect because my hotspot had a shifty IP address - between whitelisting and connecting, my address changed
MongoClient.connect('mongodb+srv://expressTut:expressTut@cluster0.cuqcdi9.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to the database')
        const db = client.db('crud01')
        const quotesCollection = db.collection('quotes')

        app.listen(3000, function() {                       //creates a server on localhost:3000 that browsers can connect to
            console.log('listening on 3000')
        })

        app.get('/', (req, res) => {                            //handles GET requests
            db.collection('quotes').find().toArray()                //first connects to database in db variable grabs the collection and turns into an array
            .then(results => {
                res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
            // res.render('index.ejs', {})
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.log(error))
        })

        app.put('/quotes', (req, res) =>{
            // quotesCollection.findOneAndUpdate(    // findOneAndUpdate is a method in MongoDB Collections - this is its basic syntax
            //     query,                            //query lets you filter with key-value pairs
            //     update,                          // tells DB what to change - uses update operators like ( $set, $inc, $push)
            //     options                          //tells DB to define additional options for this update request
            //   )
            //     .then(result => {/* ... */})
            //     .catch(error => console.error(error))

            quotesCollection.findOneAndUpdate(             //struggled to get this to work because I accidentally replaced 'update' with 'replace'
                { name: 'Hello ' },
                {
                  $set: {
                    name: req.body.name,
                    quote: req.body.quote
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {
                    res.json('Success')                     //responds to javascriopt that sent the PUT request
                })
                .catch(error => console.error(error))
        })
        app.delete('/quotes', (req, res) => {
            // quotesCollection.deleteOne(                  //deleteOne syntax method from mongoDB Collections
            //     query,                                   //filters the collection to the entries we're searching for
            //     options
            // )
            // .then(result => {/*...*/})
            // .catch(error => console.error(error))
            quotesCollection.deleteOne(
                { name: req.body.name }                 //gets the name out of the request body
            )
            .then(result =>{
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                }
                res.json("Deleted Darth Vader's quote")
            })
            .catch(error => console.error(error))
       })
    //.catch(error => console.error(error))
})






//CRUD handlers
