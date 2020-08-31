import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import axios from '../../shared/axios-mtg';
import { updateObject } from '../../shared/utility';

import * as actions from '../../store/actions';

class login extends Component {
  state = {
    townships: [],
    cities: [],
    username: {
      value: "",
      invalid: false
    },
    email: {
      value: "",
      invalid: false
    },
    password: {
      value: "",
      invalid: false
    },
    passwordCheck: {
      value: "",
      invalid: false
    },
    township: {
      value: "0",
      invalid: false
    },
    city: {
      value: "0",
      invalid: false
    }
  }

  componentDidMount() {
      axios.get('/townships')
        .then(result => {
          this.setState({
            townships: result.data.townships
          });
        })
        .catch(err => {
          console.log(err);
        });
  }

  validateForm() {
    let formIsValid = true;
    // Username validation:
    // Check for 5 minium lenght and not in use
    const username = this.state.username;
    if(username.value.length === 0){
      const updatedUsername = updateObject(this.state.username, {
        invalid: true
      });
      formIsValid = false;
      this.setState({
        username: updatedUsername
      })
    }
    // Email validation
    // Check regex and not in use
    const email = this.state.email;
    const regex = /.+@.+[.].+/;
    if(email.value.length === 0 || !regex.test(email.value)){
      const updatedEmail = updateObject(this.state.email, {
        invalid: true
      });
      formIsValid = false;
      this.setState({
        email: updatedEmail
      });
    }
    // Check password and password coincidence
    const password = this.state.password;
    const passwordCheck = this.state.passwordCheck;
    if(password.value.length < 6){
      const updatedPassword = updateObject(this.state.password, {
        invalid: true
      });
      formIsValid = false;
      this.setState({
        password: updatedPassword
      });
    }
    if(password.value !== passwordCheck.value){
      const updatedPasswordCheck = updateObject(this.state.passwordCheck, {
        invalid: true
      });
      formIsValid = false;
      this.setState({
        passwordCheck: updatedPasswordCheck
      });
    }
    // Check township
    const township = this.state.township;
    if(township.value === '0'){
      const updatedTownship = updateObject(this.state.township, {
        invalid: true
      });
      formIsValid = false;
      this.setState({
        township: updatedTownship
      });
    }
    // Check city
    const city = this.state.city;
    if(city.value === '0'){
      const updatedCity = updateObject(this.state.city, {
        invalid: true
      });
      formIsValid = false;
      this.setState({
        city: updatedCity
      });
    }
    return formIsValid;
  }

  checkUsermane = (e) => {
    axios.post('/users/checkUsername', {username: e.target.value})
      .then(result => {
        if(result.data.valid === false){
          const updatedUsername = updateObject(this.state.username, {
            invalid: true
          });
          this.setState({
            username: updatedUsername,
            formIsValid: false
          });
        };
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitHandler(e) {
    e.preventDefault();
    const newUserData = {
      username: this.state.username.value,
      email: this.state.email.value,
      password: this.state.password.value,
      township: this.state.township.value,
      city: this.state.city.value
    }
    console.log(newUserData);
    if(this.validateForm()){
      axios.post('/users/signUp', newUserData)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }else{
      console.log('no se envia...');
    }
  }

  inputHandler(e) {
    e.preventDefault();
    let updatedState = {};
    if(e.target.id === 'township'){
      const cities = this.state.townships.filter((township) => township._id === e.target.value)[0].cities;
      const updatedCity = updateObject(this.state.city, {
        value: "0"
      });
      const updatedTownship = updateObject(this.state.township, {
        value: e.target.value
      });
      updatedState = updateObject(this.state, {
        township: updatedTownship,
        city: updatedCity,
        cities: cities
      });
    }else{
      updatedState = updateObject(this.state, {
        [e.target.id]: {
          value: e.target.value,
          invalid: false
        }
      });
    }
    this.setState(updatedState);
  }

  render(){
    return (
      <Form onSubmit={(e) => this.submitHandler(e)}>
        <Form.Group controlId="username" value={this.state.username.value}>
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control type="text" placeholder="Introduce tu nombre de usuario" onChange={(e) => {this.inputHandler(e)}} isInvalid={this.state.username.invalid} onBlur={(e) => this.checkUsermane(e)}/>
          {this.state.username.invalid ?
            <Form.Text className="text-danger">
              Nombre de usuario inválido o en uso.
            </Form.Text>
            :
            null
          }
        </Form.Group>
        <Form.Group controlId="email" value={this.state.email.value}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Introduce tu email" onChange={(e) => {this.inputHandler(e)}} isInvalid={this.state.email.invalid} />
          <Form.Text muted>
            Nunca compartiremos tu email con nadie.
          </Form.Text>
          {this.state.email.invalid ?
            <Form.Text className="text-danger">
              Email inválido.
            </Form.Text>
            :
            null
          }
        </Form.Group>
        <Form.Group controlId="password" value={this.state.password.value}>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" onChange={(e) => {this.inputHandler(e)}} isInvalid={this.state.password.invalid} />
          {this.state.password.invalid ?
            <Form.Text className="text-danger">
              Contraseña inválida.
              <br />
              Debe contener 6 caracteres o más.
            </Form.Text>
            :
            null
          }
        </Form.Group>
        <Form.Group controlId="passwordCheck" value={this.state.passwordCheck.value}>
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Confimar contraseña" onChange={(e) => {this.inputHandler(e)}} isInvalid={this.state.passwordCheck.invalid} />
          {this.state.passwordCheck.invalid ?
            <Form.Text className="text-danger">
              Las contraseñas no coinciden
            </Form.Text>
            :
            null
          }
        </Form.Group>
        <Form.Group controlId="township">
          <Form.Label>Selecciona tu provincia</Form.Label>
          {this.state.townships.length > 0 ?
            (<Form.Control as="select" onChange={(e) => {this.inputHandler(e)}} value={this.state.township.value} isInvalid={this.state.township.invalid} >
              <option value="0" disabled>Seleciona tu provincia...</option>
              {this.state.townships.map((township) => <option key={township._id} value={township._id}>{township.name}</option>)}
            </Form.Control>)
            :
            <div><Spinner animation="grow" variant="info" /></div>
          }
          {this.state.township.invalid ?
            <Form.Text className="text-danger">
              Debe seleccionar una provincia.
            </Form.Text>
            :
            null
          }
        </Form.Group>
        {this.state.township.value !== '0' ?
          <Form.Group controlId="city">
            <Form.Label>Selecciona tu ciudad</Form.Label>
            <Form.Control as="select" onChange={(e) => {this.inputHandler(e)}} value={this.state.city.value} isInvalid={this.state.city.invalid}>
              <option value="0" disabled>Selecciona tu ciudad...</option>
              {this.state.cities.map((city) => <option key={city._id} value={city._id}>{city.name}</option>)}
            </Form.Control>
            {this.state.city.invalid ?
              <Form.Text className="text-danger">
                Debe seleccionar una provincia.
              </Form.Text>
              :
              null
            }
          </Form.Group>
          :
          null
        }
        <Button variant="info" type="submit" className="float-right">
          Registrar
        </Button>
      </Form>
    );
  };
}

export default login;
