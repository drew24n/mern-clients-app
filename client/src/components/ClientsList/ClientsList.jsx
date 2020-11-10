import React from 'react';
import styles from './ClientsList.module.scss';

export default function ClientsList({state, dispatch}) {
    return (
        <section className={styles.container}>
            <h1>Clients list</h1>
            <div className={styles.table}>
                <div>
                    <h4>Client Name</h4>
                    <h4>Client Age</h4>
                </div>
                {state.clients.map(client => {
                    return (
                        <div className={styles.clientItem} key={client._id}>
                            <p>{client.name}</p><p>{client.age}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}