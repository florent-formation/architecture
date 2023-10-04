const ModelUser = require("../models/user")

class User {
    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static auth(req, res) {
        ModelUser.findOne({
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
    static async register(req, res) {
        // Securise les données
        let u = new ModelUser(req.body)
        let result = await u.save()

        res.redirect(result ? "/login": "/register")
    }
}

module.exports = User