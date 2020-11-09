import React from 'react';
import styles from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";

export default function App() {
    const state = useSelector(state => state.clients)
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>

        </div>
    )
}