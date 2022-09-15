let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
var cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ticketmanagement',
})
db.connect(()=>{
    console.log('Connected')
});

app.use(cors())

app.get('/ticket', (req, res)=>{
    db.query('SELECT * FROM ticket_detail', (err,results,fields) =>{
        let message = "";
        if(results===undefined || results.length===0){
            message = "Ticket is Empty"
        }
        else{
            message = "here all tickets"
        }
        console.log(results)
        return res.send({
            data:results,
            message
        })
    })
})

app.get('/ticket/:id', (req, res)=>{
    let id = req.params.id
    db.query('SELECT * FROM ticket_detail where id = ? ',[id], (err,results,fields) =>{
        let message = "";
        if(results===undefined || results.length===0){
            message = "Ticket is Empty"
        }
        else{
            message = "here all tickets"
        }
        console.log(results)
        return res.send({
            data:results,
            message
        })
    })
})

app.post('/ticket', (req, res)=>{
    let title = req.body.title
    let description = req.body.description
    let contact_information= req.body.contact_information
   

    db.query('insert into ticket_detail (title, description,contact_information ) values (?,?,?)',[title, description, contact_information],(err,results,fields)=>
    {
    if(err)
    {
        console.log(err)
    }
    else{
    return res.send({
        data: results
     })
    }   
    })
})

app.put('/ticket/:id',(req,res)=>{
    let id = req.params.id
    let title = req.body.title
    let description = req.body.description
    let contact_information= req.body.contact_information
    let status = req.body.status

    if(!id){
        return res.status(400).send({
            error: "Please provide id"
        }
        )}

    else{
        db.query('update ticket_detail SET title = ? , description = ? , contact_information = ? , status = ? where id = ? ', [title,description,contact_information,status,id],(err,results,fields)=>{
            if(err){
            console.log(err);
            }
            if(results.changedRows === 0){
                message = "Ticket not found or data are same"
            }
            else{
                message = "Ticket has updated"
            }
            return res.send({
                data:results,
                message
            })
        })
    }
})

app.listen(3001,()=>{
    console.log('App running on port 3001');
})

module.exports = app;

