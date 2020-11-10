import React, {useEffect, useRef} from 'react';
import styles from './EditClient.module.scss';
import {Form, Input, InputNumber, Modal, Button} from "antd";
import {setEditMode, updateClient} from "../../redux/clientsReducer";

export default function EditClient({state, dispatch}) {
    const [editForm] = Form.useForm()
    const formRef = useRef('')

    useEffect(() => {
        if (formRef.current) {
            editForm.resetFields()
        }
    }, [state.edit.client.name, state.edit.client.age, editForm])

    const handleOk = async ({name, age}) => {
        const success = await dispatch(updateClient(state.edit.client._id, {name, age}))
        if (success) {
            dispatch(setEditMode(false, {}))
        }
    }

    const handleCancel = () => {
        dispatch(setEditMode(false, {}))
    }

    const validateInputs = {
        required: 'This field is required!',
        max: {
            name: 'Name cannot be longer than 30 characters!'
        }
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8}
    }

    return (
        <Modal
            title="Edit Client"
            visible={state.edit.isEditMode}
            onCancel={handleCancel}
            footer={[
                <Button onClick={handleCancel} key="1">Cancel</Button>,
                <Button form="editClient" htmlType="submit" key="2" loading={state.isUpdatingInProcess}>Update</Button>
            ]}
        >
            <div className={styles.container}>
                <h1>Edit Client</h1>
                <Form form={editForm} id="editClient" onFinish={handleOk} validateMessages={validateInputs} {...layout}
                      initialValues={state.edit.client} ref={formRef}>
                    <Form.Item name={'name'} label="Client Name" rules={[{required: true, max: 100}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'age'} label="Client Age" rules={[{required: true}]}>
                        <InputNumber min={1} max={99}/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}