const ModelUser = require("../models/user")

class User {
    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static async auth(req, res) {
        let user = await ModelUser.findOne({login:req.body.login, password: req.body.password})
        if (user){
            req.session.user = user
            return res.redirect("/")
        }

        req.session.errors["/login"] = [
            "Les identifiants de connection ne sont pas valide"
        ]

        res.redirect("/login")
    }

    /** 
     *  @url=/user
     *  @method=POST
     */
    static async register(req, res) {
        // Securise les données
        let user = await ModelUser.findOne({login:req.body.login, password: req.body.password})
        if (user){
            return res.redirect("/login")
        }

        user = new ModelUser(req.body)
        res.redirect(user.save() ? "/login": "/register")
    }

    /** 
     *  @url=/logout
     *  @method=GET
     */
    static async logout(req, res) {
        // Securise les données
        req.session.destroy();
        res.redirect("/")
    }


    /** 
     *  @url=/user/delete
     *  @method=GET
     */
    static async delete(req, res) {
        // Securise les données
        if (!req.session.user){
            return res.redirect("/login")
        }

        req.session.user.delete()
        res.redirect("/logout")
    }
}

module.exports = User