import React from 'react';
import styles from './ClientsList.module.scss';
import {Spin, Button} from "antd";
import {deleteClient} from "../../redux/clientsReducer";

export default function ClientsList({state, dispatch}) {
    return (
        <Spin size="large" spinning={state.isFetching} tip={'Loading'}>
            <section className={styles.container}>
                <h1>Clients list</h1>
                <div className={styles.clientsHeader}>
                    <h4>Client Name</h4>
                    <h4>Client Age</h4>
                    <h4>Edit</h4>
                    <h4>Delete</h4>
                </div>
                {state.clients.map(client => {
                    return (
                        <div className={styles.clientItem} key={client._id}>
                            <p>{client.name}</p>
                            <p>{client.age}</p>
                            <Button type={'primary'} loading={false}>Edit</Button>
                            <Button type={'danger'} loading={state.isDeletingInProcess.some(id => id === client._id)}
                                    onClick={() => dispatch(deleteClient(client._id))}>
                                Delete
                            </Button>
                        </div>
                    )
                })}
            </section>
        </Spin>
    )
}