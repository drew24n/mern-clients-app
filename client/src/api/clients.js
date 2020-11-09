import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://clients-list.herokuapp.com',
    withCredentials: true
})

export const clientsApi = {
    createNew({name, age}) {
        return instance.post('/api/clients', {name, age})
    },
    fetchAll() {
        return instance.get('/api/clients')
    },
    update(id, {name, age}) {
        return instance.put(`/api/clients?${id}`, {name, age})
    },
    delete(id) {
        return instance.delete(`/api/clients?${id}`)
    }
}