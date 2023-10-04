const Datastore = require("nedb")
const db = new Datastore({filename: __dirname + "/../.db/user", autoload: true})

class User {

    _id 
    firstName
    lastName
    login
    password

    constructor(config){
        this.firstName  = config.firstName
        this.lastName   = config.lastName
        this.login      = config.login
        this.password   = config.password
    }

    static findOne(query, callback){
        return db.findOne(query, callback)
    }

    static find(query, callback){
        return db.find(query, callback)
    }

    static create(config = {}){
        new this(config)
    }

    save(){        
        return new Promise((resolve, reject) => {
            this.constructor.findOne({
                login: this.login,
                password: this.password,
            },(err, doc) => {
                if (!err){
                    return reject(false)
                }

                if (this._id){
                    db.update({_id:this._id},this,(err) => {
                        err ? reject(false) : resolve(true)
                    })
                } else {
                    db.insert(this,(err) =>{
                        err ? reject(false) : resolve(true)
                    })
                }
            })
        })

    }

}

module.exports = User