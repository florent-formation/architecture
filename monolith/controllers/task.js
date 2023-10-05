const ModelTask = require("../models/task")

class Task {
    /** 
     *  @url=/index
     *  @method=GET
     */
    static async index(req, res) {
        if (req.session.user){
            res.data.tasks = await ModelTask.find({user_id:req.session.user._id})
        }
        
        console.log("res.data.tasks",res.data.tasks)

        res.render("index",res.data)
    }

    /** 
     *  @url=/task/check/:id
     *  @method=GET
     */
    static async check(req, res) {
       let task = await ModelTask.findOne({_id: req.params.id})
           task.check = true
           task.save()
        res.redirect("/index")
    }

    /** 
     *  @url=/task/delete/:id
     *  @method=GET
     */
    static async delete(req, res) {
        let task = await ModelTask.findOne({_id: req.params.id})
            task.delete()
        res.redirect("/index")
    }
    

    /** 
     *  @url=/task
     *  @method=POST
     */
    static async add(req, res) {
        let t = new ModelTask({
            user_id: req.session.user._id,
            value: req.body.value
        })

        await t.save()

        res.redirect("/index")
    }

}

module.exports = Task