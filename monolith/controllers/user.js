const Datastore = require("nedb")
const db = new Datastore({filename: __dirname + "/../.db/user", autoload: true})

class User {
    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static auth(req, res) {
        db.findOne({
            login:    req.body.login,
            password: req.body.password
        },(err, user) =>{
            if (user){
                req.session.user = user
                return res.redirect("/")
            }

            req.session.errors["/login"] = [
                "Les identifiants de connection ne sont pas valide"
            ]

            res.redirect("/login")
        })
    }

    /** 
     *  @url=/user
     *  @method=POST
     */
    static register(req, res) {
        // Securise les données
        db.findOne({
            login:    req.body.login,
            password: req.body.password
        },(err, user) =>{
            if (!user){
                db.insert(req.body,(err) =>{
                    res.redirect(err ? "/register" : "/login") 
                })
                return 
            }

            res.redirect("/login")
        })
        
    }
}

module.exports = User