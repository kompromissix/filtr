const {Tovar} = require('./models')

class DeviceController {
    async create(req, res) {
        try {
            let {tovar, tovar123} = req.body
            const tovars = await Tovar.create({tovar, tovar123});
            return res.json(tovars)
        } catch (e) {
            console.log(e)
        }

    }

    async getAll(req, res) {
        let tovars = await Tovar.findAll()
        return res.json(tovars)
    }

    async getOne(req, res) {
        const id_tovar = req.params
        const tovars = await Tovar.findOne(
            {
                where: id_tovar
            }
        )
        return res.json(tovars)
    }
}

module.exports = new DeviceController()