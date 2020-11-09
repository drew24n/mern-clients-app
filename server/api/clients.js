const app = require('../server')
const Clients = require('../models/clients')

const clientsApi = {
    get() {
        return app.get('/api/clients', async (req, res) => {
            try {
                const clients = await Clients.find()
                res.status(200).json({success: true, data: clients})
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    },

    post() {
        return app.post('/api/clients', async (req, res) => {
            try {
                if (req.body.toString().trim().length) {
                    const note = await Clients.create(req.body)
                    res.status(201).json({success: true, data: note})
                } else {
                    res.status(400).json({success: false, error: 'Request body is required'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    }
}

module.exports = clientsApi