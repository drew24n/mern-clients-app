import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://clients-list.herokuapp.com',
    withCredentials: true
})

export const clientsApi = {
    createNew({name, age}) {
        return instance.post('/api/clients', {name, age}).then(res => res.data)
    },
    fetchAll() {
        return instance.get('/api/clients').then(res => res.data)
    },
    update(id, {name, age}) {
        return instance.put(`/api/clients?id=${id}`, {name, age}).then(res => res.data)
    },
    delete(id) {
        return instance.delete(`/api/clients?id=${id}`).then(res => res.data)
    }
}