import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const saveToken = (userToken) => {
    // Almacena el token en el estado para manejar la autenticación
    console.log(userToken);
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setLogged(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        rut,
        password,
      });

      saveToken(response.data.token);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(()=>{
    if (logged){
      navigate('/inicio');
    }
  }, [logged, navigate])
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "40%" }}>
        <Card.Body>
          <h1>Hospitapp</h1>
          <hr/>
          {error && 
            <div class="alert alert-danger" role="alert">
              Usuario y/o contraseña incorrectos.
            </div>
          }
          <h3 className="mb-4">Iniciar Sesión</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="rut">
              <Form.Label>RUT: (ej. 12345678-9)</Form.Label>
              <Form.Control type="text" required value={rut} onChange={(e) => setRut(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="w-1000 mt-3" type="submit">Iniciar Sesión</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
