module.exports = {
    env: {
        MONGO_URI: 'mongodb+srv://andrew91:0k4pvQu9RDk6QIBc@shop.ca8tl.mongodb.net/client_base?retryWrites=true&w=majority',
        URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://clients-list.herokuapp.com/api/clients/'
    }
}