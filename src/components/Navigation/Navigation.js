import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import classes from './Navigation.module.css';
import logo from '../../assets/logo192.png';

const navigation = () => (
  <Navbar bg="dark" variant="dark" className={classes.Navbar}>
    <Navbar.Brand>
      <Link to='/'>
        <img
          alt=""
          src={logo}
          className={['d-inline-block', 'align-top'].join(' ')}
        />
        Magic Local Market
      </Link>
    </Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
       <Link to="/auth">
        <Button variant='info'>Iniciar Sesión</Button>
      </Link>
    </Navbar.Collapse>
  </Navbar>
);

export default navigation;
