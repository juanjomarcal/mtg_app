import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const login = () => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Introduce tu usuario o email</Form.Label>
        <Form.Control type="email" placeholder="Introduce tu usuario o email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" />
      </Form.Group>
      <Button variant="info" type="submit" className="float-right">
        Submit
      </Button>
    </Form>
  );
}

export default login;
