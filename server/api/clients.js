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
                    const client = await Clients.create(req.body)
                    res.status(201).json({success: true, data: client})
                } else {
                    res.status(400).json({success: false, error: 'Request body is required'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    },

    put() {
        return app.put('/api/clients', async (req, res) => {
            try {
                const client = await Clients.findByIdAndUpdate(req.query.id, req.body, {new: true, runValidators: true})
                if (client) {
                    res.status(201).json({success: true, data: client})
                } else if (!client) {
                    res.status(400).json({success: false, error: 'Client was not found. Nothing to updated'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    },
    delete() {
        return app.delete('/api/clients', async (req, res) => {
            try {
                const client = await Clients.deleteOne({_id: req.query.id})
                if (client.n) {
                    res.status(200).json({success: true, data: {}})
                } else if (!client.n) {
                    res.status(400).json({success: false, error: 'Client was not found. Nothing to delete'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
        })
    }
}

clientsApi.get()
clientsApi.post()
clientsApi.put()
clientsApi.delete()

module.exports = clientsApi