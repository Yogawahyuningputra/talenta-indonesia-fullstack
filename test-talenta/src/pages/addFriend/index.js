import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { API } from '../../config/api';

const AddFriends = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
    })

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    console.log(form)

    const handleOnSubmit = async (e) => {
        console.log("jalan ga?")

        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const formData = new FormData()
            formData.set("name", form.name)
            formData.set("age", form.age)
            formData.set("gender", form.gender)

            const response = await API.post('/friend', formData, config)
            console.log(response)
            setForm({
                name: '',
                age: '',
                gender: '',
            })

            if (response.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Add Friends has been saved',
                    showConfirmButton: false,
                    timer: 3000
                })

                setShow(false)
            }

        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Add Friends Failed!'
            })
        }
    }

    return (
        <>
            <label className='button fw-bold header-text w-50 mx-2' onClick={handleShow} >Add Friends</label>

            <Modal size="sm" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-login">Add Your Friends</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleOnSubmit(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                autoFocus
                                onChange={handleOnChange}
                                name="name"
                                value={form.name}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Age"
                                onChange={handleOnChange}
                                name="age"
                                value={form.age}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleOnChange}
                                name="gender"
                                value={form.gender}>
                                <option hidden>gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type='submit' variant="primary" className="w-100">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddFriends
