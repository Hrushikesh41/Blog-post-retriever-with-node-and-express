const express = require('express');
const fetch = require('node-fetch');
const body_parser = require('body-parser')
const dotenv = require('dotenv');
const text_parser = body_parser.text();
const util = require('util');

dotenv.config();

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json());

app.use(body_parser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', text_parser, (req, res)=>{
    fetch(`https://dev.to/api/articles?username=${req.body}`)
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        if(data.length > 0){
            res.send({content: data})
        }else{
            res.send({content : []})
        }
    }).catch((err)=>{
        console.error(err);
    })
})

app.listen(3000, ()=>{
    console.log("App Listening on : " + 3000);
})