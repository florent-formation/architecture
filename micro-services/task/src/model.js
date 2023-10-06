const Datastore = require("nedb")
const db = new Datastore({filename: __dirname + "/../.db/task", autoload: true})

class Task {

    _id 
    value
    check
    user_id

    constructor(config  = {}){
        this._id     = config._id
        this.value   = config.value
        this.check   = config.check || false
        this.user_id = config.user_id
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
            db.find(query, (err,doc) => {
                if (err){
                    return reject(err)
                }

                if (!doc){
                    return resolve(doc)
                }

                let result = []
                for (let data of doc){
                    result.push(new this(data))
                }
                resolve(result)
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

module.exports = Task