const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',function(request,response){

    response.status(400).send('Hello Five Points');
})

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send('I got some data')
})

console.log('Listen port 3000');
app.listen(3000);