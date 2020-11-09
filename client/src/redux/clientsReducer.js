const SET_CLIENTS = "SET_CLIENTS"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    clients: [],
    isFetching: false
}

export const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENTS:
            return {
                ...state, clients: [...action.clients]
            }
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

const setClients = (clients) => ({type: SET_CLIENTS, clients})
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})