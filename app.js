const config = require('config')
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:debug')
const middleWare = require('./logger')
const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
app.use(express.json())
const courses =[
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.use((req, res, next)=>{
    console.log(`This is a middle ware for each request ${req}`)
    next()
})
const env = process.env.NODE_ENV // undefined
// configuration 
console.log('Application: '+ config.get('name'))
console.log('Mail server: '+ config.get('mail.host'));
console.log('Mail password: '+ config.get('mail.password'))
if(app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    startupDebugger('enabled morganssss');
}

dbDebugger('database connected');

app.use(middleWare);
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.get('/', function (req, res) {
  res.send('Hello world')
})
app.get('/api/courses', function (req, res) {
    res.send(courses)
  })

app.put('/api/courses/:id', (req, res)=> {
    const id = req.params.id;
    courses.find(a => a.id = id).name = req.body.name;
  res.send(courses);
})

app.put('/api/courses/:id', (req, res)=> {
    const id = req.params.id;
    courses.find(a => a.id = id).name = req.body.name;
  res.send(courses);
})

app.post('/api/courses', (req, res)=> {
 const schema = {
    name: Joi.string().min(3).required()
 }
 const result = Joi.validate(req.body, schema);
 
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
})


const port = process.env.PORT || 3000

app.listen(port, () => console.log(`you are listening to port ${port}`))

function validate(request){


}