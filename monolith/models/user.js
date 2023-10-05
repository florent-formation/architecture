const Datastore = require("nedb")
const db = new Datastore({filename: __dirname + "/../.db/user", autoload: true})

class User {

    _id 
    firstName
    lastName
    login
    password

    constructor(config  = {}){
        this._id        = config._id
        this.firstName  = config.firstName
        this.lastName   = config.lastName
        this.login      = config.login
        this.password   = config.password
    }

    static async findOne(query){
        return new Promise((resolve,reject) => {
            db.findOne(query, (err,doc) => {
                if (err){
                    return reject(err)
                }

                if (!doc){
                    return resolve(doc)
                }

                resolve(new this(doc))
            })
        })
    }

    static find(query){
        return new Promise((resolve,reject) => {
            db.findOne(query, (err,doc) => {
                if (err){
                    return reject(err)
                }

                if (!doc){
                    return resolve(doc)
                }

                resolve(new this(doc))
            })
        })
    }

    async delete(){
        return new Promise((resolve, reject) => {
            db.remove({_id: this._id},(err) => {
                err ? reject(false) : resolve(true)
            })
        })
    }

    async save(){        
        return new Promise((resolve, reject) => {
            if (this._id){
                db.update({_id: this._id},this,(err) => {
                    err ? reject(false) : resolve(true)
                })
            } else {
                db.insert(this,(err) =>{
                    err ? reject(false) : resolve(true)
                })
            }
        })
    }

}

module.exports = User