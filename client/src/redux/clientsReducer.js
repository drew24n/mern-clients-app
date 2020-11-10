import {clientsApi} from "../api/clients";
import {notificationError, notificationSuccess} from "../utils/notifications";

const SET_CLIENTS = "SET_CLIENTS"
const SET_CLIENTS_FETCHING = "SET_CLIENTS_FETCHING"
const ADD_NEW_CLIENT = "ADD_NEW_CLIENT"
const IS_ADDING_IN_PROCESS = "IS_ADDING_IN_PROCESS"
const UPDATE_CLIENT = "UPDATE_CLIENT"
const IS_UPDATING_IN_PROCESS = "IS_UPDATING_IN_PROCESS"
const DELETE_CLIENT = "DELETE_CLIENT"
const IS_DELETING_IN_PROCESS = "IS_DELETING_IN_PROCESS"

const initialState = {
    clients: [],
    isFetching: false,
    isAddingInProcess: false,
    isUpdatingInProcess: [],
    isDeletingInProcess: []
}

export const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CLIENTS:
            return {
                ...state, clients: [...action.clients]
            }
        case SET_CLIENTS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case ADD_NEW_CLIENT:
            return {
                ...state, clients: [...state.clients, action.newClient]
            }
        case IS_ADDING_IN_PROCESS:
            return {
                ...state, isAddingInProcess: action.isAddingInProcess
            }
        case UPDATE_CLIENT:
            return {
                ...state, notes: state.clients.map(client => {
                    if (client._id === action.client._id) {
                        return action.client
                    } else {
                        return client
                    }
                })
            }
        case IS_UPDATING_IN_PROCESS:
            return {
                ...state, isUpdatingInProcess: action.isUpdatingInProcess
                    ? [...state.isUpdatingInProcess, action.id]
                    : state.isUpdatingInProcess.filter(id => id !== action.id)
            }
        case DELETE_CLIENT:
            return {
                ...state, clients: state.clients.filter(client => {
                    if (client._id !== action.id) {
                        return client
                    }
                })
            }
        case IS_DELETING_IN_PROCESS:
            return {
                ...state, isDeletingInProcess: action.isDeletingInProcess
                    ? [...state.isDeletingInProcess, action.id]
                    : state.isDeletingInProcess.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

const setClients = (clients) => ({type: SET_CLIENTS, clients})
const setClientsFetching = (isFetching) => ({type: SET_CLIENTS_FETCHING, isFetching})
const addNewClientAction = (newClient) => ({type: ADD_NEW_CLIENT, newClient})
const setIsAddingInProcess = (isAddingInProcess) => ({type: IS_ADDING_IN_PROCESS, isAddingInProcess})
const updateClientAction = (client) => ({type: UPDATE_CLIENT, client})
const setIsUpdatingInProcess = (id, isUpdatingInProcess) => ({type: IS_UPDATING_IN_PROCESS, id, isUpdatingInProcess})
const deleteClientAction = (id) => ({type: DELETE_CLIENT, id})
const setIsDeletingInProcess = (id, isDeletingInProcess) => ({type: IS_DELETING_IN_PROCESS, id, isDeletingInProcess})

export const getClients = () => async (dispatch) => {
    try {
        dispatch(setClientsFetching(true))
        const {success, data} = await clientsApi.fetchAll()
        if (success) {
            dispatch(setClients(data))
        }
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setClientsFetching(false))
    }
}

export const addNewClient = ({name, age}) => async (dispatch) => {
    try {
        dispatch(setIsAddingInProcess(true))
        const {success, data} = await clientsApi.createNew({name, age})
        if (success) {
            dispatch(addNewClientAction(data))
            notificationSuccess(`${name} has been added!`)
        }
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsAddingInProcess(false))
    }
}

export const updateClient = (id, {name, age}) => async (dispatch) => {
    try {
        dispatch(setIsUpdatingInProcess(true))
        const {success, data} = await clientsApi.update(id, {name, age})
        if (success) {
            dispatch(updateClientAction(data))
            notificationSuccess(`${name} has been updated!`)
        }
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsUpdatingInProcess(false))
    }
}

export const deleteClient = (id) => async (dispatch) => {
    try {
        dispatch(setIsDeletingInProcess(id, true))
        const {success} = await clientsApi.delete(id)
        if (success) {
            dispatch(deleteClient(id))
            notificationSuccess('Client has been deleted!')
        }
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsDeletingInProcess(id, false))
    }
}