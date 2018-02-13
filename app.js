const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = express();



const connection = (closure)=>{

    return MongoClient.connect('mongodb://localhost:27017/App1Db',(err,client)=>{

    if (err) return console.log(err);
    let db = client.db('App1Db');
    closure(db);
    })

   
}


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

/* Get multiple  items */

app.get('/users',function(request,response){
connection(db=>{

    db.collection('pool').find().toArray((err,result)=>{

        response.send(result)
        GetData(result)
    })
})
})

/*Add an item*/
app.post('/add_user',function(request,response){
    connection(db=>{

        
    
        db.collection('pool').insert(request.body),(result,err)=>{
response.send(result)
response.send(err)
console.log(result)

        }
    })
    })

/* Get one item */

    app.get('/users/:id',(req,res)=>{

        connection(db=>{

            let userID = req.params.id;

db.collection('pool').findOne({_id:ObjectID(userID)},(request,result)=>{
res.send(result)
})
      })
    })
/* update an item */

    app.put('/update',(req,res)=>{

        connection(db=>{
            db.collection('pool').update(req.body

             ,(request,result)=>{
    
                res.send(result)
             })
            
        })
        
 
    })

    ////////////

    app.get('/update/:id/:Todo',(req,res)=>{

        let userID = req.params.id;
        let indexTodo = req.params.iTodo;

        connection(db=>{

            db.collection('pool').findOne({_id:ObjectID(userID)},(err,result)=>{

                if(err) throw err;

                res.send(result.todos[indexTodo]);

            })

        })
    })

    app.put('/users/:id/:iTodo',(req,res)=>{

        let userId = req.params.id;
        let indexTodo= req.params.iTodo;

        connection(db=>{
           
db.collection('pool').update(



    {_id:ObjectID(userId)},{$set:{["todos"+indexTodo]:req.body}},(err,result)=>{

        res.send(result)
    })

        })


    
    })

    /*delete*/

    app.delete('/delete',(req,res)=>{

connection(db=>{
db.collection('pool').delete(req.body,(request,result)=>
{
res.send(result)

})

})

    })

/**************/

console.log('Listen port 3000');
app.listen(3000);