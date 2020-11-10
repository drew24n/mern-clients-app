import React from 'react';
import styles from './NewClient.module.scss';
import {Form, Input, InputNumber, Button} from "antd";
import {addNewClient} from "../../redux/clientsReducer";

export default function NewClient({state, dispatch}) {
    const [form] = Form.useForm()

    const handleSaveClient = async ({name, age}) => {
        const {success} = await dispatch(addNewClient({name, age}))
        if (success) {
            form.resetFields()
        }
    }

    const validateInputs = {
        required: '${label} is required!',
        max: {
            name: '${label} cannot be longer than 30 characters!'
        }
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8},
    }

    return (
        <section className={styles.container}>
            <h1>Create New Client</h1>
            <Form form={form} onFinish={handleSaveClient} validateMessages={validateInputs} {...layout}>
                <Form.Item name={'name'} label="Client Name" rules={[{required: true, max: 100}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={'age'} label="Client Age" rules={[{required: true}]}>
                    <InputNumber min={18} max={100}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={state.isAddingInProcess}>Save</Button>
            </Form>
        </section>
    )
}