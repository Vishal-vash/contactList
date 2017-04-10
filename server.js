var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.get('/contactList', function(req, res){
    db.contactList.find(function(err, docs){
        res.json(docs);
    })
})

app.post('/contactList', function(req, res){
    db.contactList.insert(req.body, function(err, doc){
        res.json(doc);
    });
})

app.delete('/contactList/:id', function(req, res){
    var id = req.params.id;
    db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
})
app.listen(3000);
console.log("Server started at 3000")