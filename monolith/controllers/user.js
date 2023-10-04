const Datastore = require("nedb")
const db = new Datastore({filename: __dirname + "/../.db/user", autoload: true})

class User {
    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static auth(req, res) {
        res.end()
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
        },(err, doc) =>{
            if (!doc){
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