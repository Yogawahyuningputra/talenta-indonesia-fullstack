import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { API } from '../../config/api';
import Swal from 'sweetalert2'

const Register = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [register, setRegister] = useState({
        fullname: '',
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnSubmit = async (e) => {


        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const formData = new FormData()

            formData.set("fullname", register.fullname)
            formData.set("email", register.email)
            formData.set("password", register.password)

            const response = await API.post('/register', formData, register, config)
            if (response.data.code === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Register has been success',
                    showConfirmButton: false,
                    timer: 3000
                })
            }


            setRegister({
                fullname: '',
                email: '',
                password: '',
            })

        } catch (error) {
            alert("Register Gagal !")
            console.log(error)
        }
    }

    return (
        <>
            <Button className='button text-white fw-bold px-4 header-text w-50 mx-3 mb-2' onClick={handleShow} >Register</Button>

            <Modal size="sm" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-login">Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleOnSubmit(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="FullName"
                                autoFocus
                                onChange={handleOnChange}
                                name="fullname"
                                value={register.fullname}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={handleOnChange}
                                name="email"
                                value={register.email}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={handleOnChange}
                                name="password"
                                value={register.password}

                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            Register
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Register