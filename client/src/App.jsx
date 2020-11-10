import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import NewClient from "./components/NewClient/NewClient";
import ClientsList from "./components/ClientsList/ClientsList";
import {notificationError} from "./utils/notifications";
import {getClients} from "./redux/clientsReducer";

export default function App() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("unhandledrejection", error => notificationError(error))
    }, [])

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])

    return (
        <main className={styles.container}>
            <NewClient state={state} dispatch={dispatch}/>
            <ClientsList state={state} dispatch={dispatch}/>
        </main>
    )
}