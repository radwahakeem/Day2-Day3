

const express=require('express');
const fs=require("fs")
const app=express(); 
const cors=require('cors');
const { response } = require('express');


app.use(cors()); 
app.use(function(req,res,next) 
{

console.log("hi") 
next();
})

app.use(express.urlencoded({extended:true}))

app.get('/registerForm',function(req,res)
{
    Form=fs.readFileSync("registerForm.html",'utf-8');

    res.send(Form);
    
})

app.post('/registeration',function(request,response){
let enteredFirstName= request.body.name;
let enteredUserName = request.body.userName;
let enteredPassword = request.body.password;


    let users = JSON.parse(fs.readFileSync("usersLogs.txt","utf-8"));
       if(enteredFirstName &&  enteredUserName && enteredPassword){
       let newUser=request.body
       users.push(newUser);
         fs.writeFileSync("usersLogs.txt",JSON.stringify(users)); 
         response.send("your registered successfully");
       }
       else if (!enteredFirstName && enteredUserName && enteredPassword){
           response.status(424).send("error:{name} is required");

       }
       else if (enteredFirstName && !enteredUserName && enteredPassword){
        response.status(424).send("error:{user name} is required");
       }
       else if (enteredFirstName && enteredPassword){
        response.status(424).send("error:{password} is required");
       }
        
})

app.get('/login',function(request,response){
    loginForm=fs.readFileSync("loginForm.html",'utf-8');

    response.send(loginForm);
})
app.post('/login',function(request,response) {

let enteredUserName = request.body.userName;
let enteredPassword = request.body.password;


    let users = JSON.parse(fs.readFileSync("usersLogs.txt","utf-8"));
       if(enteredUserName  &&  enteredPassword){

        for(var i =0 ; i<users.length;i++){
            

            if(enteredUserName == users[i].userName && enteredPassword == users[i].password){
                response.send("you registered successfully");
            }else{
                response.status(401).send("error:invalid credentials");
            }
        }
        


       }
})
app.get('/todos',function(request,response){
    let todos=fs.readFileSync('todos.html','utf-8');
    response.send(todos)
})
app.post('/todos',function(request,response){
    console.log(request.body);
    let userName= request.body.name;
    let title = request.body.title;
    let todoFile=JSON.parse(fs.readFileSync('todo.txt','utf-8'));
    if(userName && title ){
        let todoList = request.body;
        todoFile.push(todoList);
    fs.writeFileSync("todo.txt",JSON.stringify(todoFile)); 
    response.send("todo created successfully");
    }
})
app.get('/todo/:id',function(){
    let todos=JSON.parse(fs.readFileSync('todo.txt','utf-8'));
    
    let selectedTodoID= parseInt(request.params.id);
    let todoList=todos[selectedTodoID]-1;
    response.send(JSON.stringify(todoList));
    
})

app.listen(4444,function()
{
    console.log('hi')
})