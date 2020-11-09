import {applyMiddleware, compose, createStore} from "redux";
import {clientsReducer} from "./clientsReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(clientsReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))