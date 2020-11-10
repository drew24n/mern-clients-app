import React from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import NewClient from "./components/NewClient/NewClient";
import ClientsList from "./components/ClientsList/ClientsList";

export default function App() {
    const state = useSelector(state => state.clients)
    const dispatch = useDispatch()

    return (
        <main className={styles.container}>
            <NewClient/>
            <ClientsList/>
        </main>
    )
}