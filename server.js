const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const port = 5000;
const budgetModel = require('./models/budget_schema.js')
const url = 'mongodb://localhost:27017/personal_budget';

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static('public'));

//const data = require("\dev\week03\personal-budget"); 
//console.log(data);

app.get('/budgetItem', (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
      budgetModel.find({})
        .then((data)=> {
          res.json(data)
          mongoose.connection.close();
        })
        .catch((connectionError)=> {
          console.log(connectionError);
        });
    });
});

app.post('/budgetItemsAdd', (req, res) => {
   //console.log(req.body);
   mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
   .then(()=> {
       var budgetItem = new budgetModel({
       title: req.body.title,
       budget: req.body.budget,
       color: req.body.color
     });
     budgetModel.insertMany(budgetItem)
      .then((data)=> {
      res.json(data);
      mongoose.connection.close();
      })
      .catch((connectionError)=> {
        console.log(connectionError)
      });
   })
      .catch((connectionError)=>{
        console.log(connectionError)
      });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});



















 /* const budget ={
  myBudget: [
  {
    title: 'Eat out',
    budget: 100
  },
  {
    title: 'Rent',
    budget: 800
  },
  {
    title: 'Grocery',
    budget: 200
  },
  {
    title: 'Credit Card',
    budget: 150 
  },
  {
    title: 'Car payment',
    budget: 300
  },
  {
    title: 'Internet',
    budget: 75
  },
  {
    title: 'Electric bill',
    budget: 50
  },
]
};  */