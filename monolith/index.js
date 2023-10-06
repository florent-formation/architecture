// https://github.com/florent-formation/architecture.git

const express = require("express");
const session = require("express-session");
const fs      = require("fs");
const path    = require("path");
const User    = require("./models/user");
const app     = express();
const port    = 3000;

const controllerPath = path.join(__dirname , "controllers");
const staticPath     = path.join(__dirname , "static");
const viewPath       = path.join( __dirname , "views" );


app.set("view engine",'ejs')
app.set("views", viewPath)

app.use(express.static(staticPath))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    resave: false,
    secret: '@Ck34CMDaFD&okiQm6@&',
    saveUninitialized: true,
}))
app.use((req,res,next) => {

    if (path.extname(req.url) !== "") {
        return next()
    } 

    if (req.url === "/"){
        req.url = "/index"
    }

    if(!req.session.errors){
        req.session.errors = {}
    }

    if (req.session.user){
        req.session.user = new User(req.session.user)
    }

    res.data = {
        url: req.url,
        session: req.session
    }

    return next()
})

for (const fileName of fs.readdirSync(controllerPath)){
    const filePath   = path.join(controllerPath,fileName);
    const controller = require(filePath)

    for (const route of extractRoutes(controller.toString())) {
        console.log("Controller",controller.name, route.url+":"+route.method,route.action, "registered")
        app[route.method](route.url,controller[route.action])
    }
}

app.use((req,res, next) => {
    // /            => index       => index.ejs
    // /hello/world => hello/world => hello/world.ejs
    res.render(req.url.replace("/",""),res.data)
})


app.listen(port,() => {
    console.log(`server is running on port: ${port}`);
})


function extractRoutes(str) {
    const routes = [];
    let currentRoute = {};
    const regex = /@url\s?=\s?(.*)|@method\s?=\s?(.*)|static\s(?:async\s)?(.*)\s?\(/g;
    let match;

    while ((match = regex.exec(str)) !== null) {
        const [_, url, method, action] = match;
        if (url !== undefined) currentRoute.url = url;
        if (method !== undefined) currentRoute.method = method.toLowerCase();
        if (action !== undefined) currentRoute.action = action;
        if (currentRoute.url && currentRoute.method && currentRoute.action) {
            routes.push(currentRoute);
            currentRoute = {};
        }
    }

    return routes;
}



