import React from 'react';
import styles from './ClientsList.module.scss';
import {Spin, Button} from "antd";
import {deleteClient, setEditMode} from "../../redux/clientsReducer";

export default function ClientsList({state, dispatch}) {
    return (
        <Spin size="large" spinning={state.isFetching} tip={'Loading clients'}>
            <section className={styles.container}>
                <h1>Clients List</h1>
                {state.clients.length
                    ? <>
                        <div className={styles.clientsHeader}>
                            <h4>Client Name</h4>
                            <h4>Client Age</h4>
                            <h4>Edit</h4>
                            <h4>Delete</h4>
                        </div>
                        {state.clients.slice(0).reverse().map(client => {
                            return (
                                <div className={styles.clientItem} key={client._id}>
                                    <p>{client.name}</p>
                                    <p>{client.age}</p>
                                    <Button type={'primary'} onClick={() => dispatch(setEditMode(true, client))}>
                                        Edit
                                    </Button>
                                    <Button type={'danger'}
                                            loading={state.isDeletingInProcess.some(id => id === client._id)}
                                            onClick={() => dispatch(deleteClient(client._id))}>
                                        Delete
                                    </Button>
                                </div>
                            )
                        })}
                    </>
                    : <p className={styles.emptyListMsg}>List is empty</p>
                }
            </section>
        </Spin>
    )
}