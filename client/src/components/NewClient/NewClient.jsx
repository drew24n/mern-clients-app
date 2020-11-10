import React from 'react';
import styles from './NewClient.module.scss';
import {Form, Input, InputNumber, Button} from "antd";
import {addNewClient} from "../../redux/clientsReducer";

export default function NewClient({state, dispatch}) {
    const [newForm] = Form.useForm()

    const handleSaveClient = async ({name, age}) => {
        const {success} = await dispatch(addNewClient({name, age}))
        if (success) {
            newForm.resetFields()
        }
    }

    const validateInputs = {
        required: 'This field is required!',
        max: {
            name: 'Name cannot be longer than 30 characters!'
        }
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8},
    }

    return (
        <section className={styles.container}>
            <h1>Create New Client</h1>
            <Form form={newForm} onFinish={handleSaveClient} validateMessages={validateInputs} {...layout}>
                <Form.Item name={'name'} label="Client Name" rules={[{required: true, max: 100}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={'age'} label="Client Age" rules={[{required: true}]}>
                    <InputNumber min={1} max={99}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={state.isAddingInProcess}>Save</Button>
            </Form>
        </section>
    )
}