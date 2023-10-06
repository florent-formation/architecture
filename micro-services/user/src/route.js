const ModelUser = require("./model")

class User {
    /** 
     *  @url=/user
     *  @method=GET
     */
    static async allUsers(req, res) {

    }

    /** 
     *  @url=/user/:id
     *  @method=GET
     */
    static async oneUser(req, res) {

    }

    /** 
     *  @url=/user/auth
     *  @method=POST
     */
    static async authUser(req, res) {

    }

    /** 
     *  @url=/user
     *  @method=PUT
     */
    static async updateUser(req, res) {

    }

    /** 
     *  @url=/user
     *  @method=PATCH
     */
    static async partialUpdateUser(req, res) {

    }


    /** 
     *  @url=/user/:id
     *  @method=DELETE
     */
    static async deleteUser(req, res) {

    }
}

module.exports = User