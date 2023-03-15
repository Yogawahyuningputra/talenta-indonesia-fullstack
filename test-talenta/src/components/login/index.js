import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';
import Swal from 'sweetalert2'

const Login = () => {
    const [state, dispatch] = useContext(UserContext)

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const handleOnChange = (e) => {
        setLogin({
            ...login,
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
            formData.set("email", login.email)
            formData.set("password", login.password)

            const response = await API.post('/login', formData, login, config)
            if (response.data.code === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login has been success',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            //send data to usecontext => create token 
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data
            })

            setLogin({
                email: '',
                password: '',
            })

        } catch (error) {
            alert("Login Gagal !")
            console.log(error)
        }
    }
    return (
        <>
            <Button className='button text-white fw-bold px-4 header-text w-50 mx-3 mb-2' onClick={handleShow} >Login</Button>

            <Modal size="sm" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="title-login">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleOnSubmit(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                autoFocus
                                onChange={handleOnChange}
                                name="email"
                                value={login.email}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                onChange={handleOnChange}
                                name="password"
                                value={login.password}

                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className='w-100' >
                            Login
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Login