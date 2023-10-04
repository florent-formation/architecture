class User {
    /** 
     *  @url =/auth
     *  @method= POST
     */
    static auth(req, res) {
        console.log("/auth")
    }

    /** 
     *  @url = /register
     *  @method=POST
     */
    static register(req, res) {
        console.log("/register")
    }
}

module.exports = User