import React, { useContext } from 'react';
import Brand from '../../assests/images/talenta.png'
import Login from '../login';
import Register from '../register'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import AddFriends from '../../pages/addFriend';

const Headers = () => {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)

    const Logout = () => {
        dispatch({
            type: "LOGOUT_SUCCESS"
        })
        alert('Logout Success')
        navigate("/")
    }
    return (
        <Navbar bg="light" expand="lg" animation="glow">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Brand} alt='brand' width={150} />

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto fw-bold">
                        {state.isLogin === true ? (

                            <NavDropdown title="Menu" id="basic-nav-dropdown" className='header-text'>
                                <NavDropdown.Item>
                                    <span className='mx-2 header-text' onClick={() => navigate('/my-friends')}>My Friends</span>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <AddFriends /> 
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <span className='mx-2 header-text fw-bold' onClick={Logout}>Keluar</span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Login />

                                <Register />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Headers
