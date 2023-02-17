let fs =require ("fs");

let productDB =JSON.parse(fs.readFileSync("products.json","utf-8")) 
console.log(productDB)  

console.log(productDB[1]);

// ------------task 2

const http = require("http");
const server =http.createServer (function(request,response){
  
    const urls= request.url.split('/');
    
        if(urls[1]=="index"){
            let index=fs.readFileSync("index.html",'utf-8');
            response.write(index);
        }
    
        else if (urls[1]=="products"&& !urls[2] ){
            let products =JSON.stringify(productDB)
            response.write(products);
    
        }
    
        else if (urls[1]=="products" && parseInt(urls[2])){
            let id = urls[2]-1
            selectedProduct= productDB[id];
            let product =JSON.stringify(selectedProduct)
            response.write(product);
            
        }   
         else
        {
            response.writeHead(404);
            response.write('<h1>notfound</h1>')
        }
   
        response.end();
})


server.listen(4000, function(){
    console.log("I'm starting Hiiiii from server");
})

