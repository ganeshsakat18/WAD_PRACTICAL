
const path = require("path");
const fs=require("fs");
const http=require("http");
const url=require("url");

const server=http.createServer((req,res)=>{

    const parseUrl=url.parse(req.url);

    let pathname=`.${parseUrl.pathname}`; //basically here server check the which path server want like ./about
    if(pathname.charAt(pathname.length-1)==='/'){
        pathname+="index.html";    // if the user request without spefying file then by default is index,html
    }

    let extname=path.extname(pathname);
    let contentType="text/html";

    switch(extname){
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
            break;
        case '.png':
            contentType='image/png';
            break;
        case '.jpg':
            contentType='image/jpg';
            break;     
        case '.wav':
            contentType='audio/wav';
            break;
        case '.json':
            contentType='application/json';
            break;
    }

    fs.readFile(pathname,(err,data)=>{ //this function used for reading the file from the server by its provided pathname
        if(err){
            if(err.code=='ENOENT'){  //this tells that file is not exist and give 404 error
                res.writeHead(404);
                res.end("File not found");
            }else{
                res.writeHead(500);  //internet server error
                res.end(`Internal server error ${err.code}`);
            }
        }else{
            res.writeHead(200,{'Content-type':contentType}); //sucessfully read the file status code 200
            res.end(data); //data read here
        }
    });

    

});


server.listen(3000,()=>{
   
    console.log(`Server is listing at 3000`);
});