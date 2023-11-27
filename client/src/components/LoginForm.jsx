import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container } from 'react-bootstrap';

const LoginForm = ({ onLogin }) => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        rut,
        password,
      });

      onLogin(response.data.token);
    } catch (error) {
      alert('Usuario o contraseña incorrectos', error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group id="rut">
              <Form.Label>Rut:</Form.Label>
              <Form.Control type="text" required value={rut} onChange={(e) => setRut(e.target.value)} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="w-1000" type="submit">Iniciar Sesión</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
