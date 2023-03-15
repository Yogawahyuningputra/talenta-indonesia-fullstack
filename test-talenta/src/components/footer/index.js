import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <Container fluid className="bg-light fw-bold fs-4 mt-5" style={{ textAlign: 'center' }}>
            <p>&copy; 2023 Test Talenta Indonesia Raya. All rights reserved.</p>
        </Container>
    );
}

export default Footer;
