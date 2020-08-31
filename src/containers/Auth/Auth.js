import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';

import classes from './Auth.module.css';

class Auth extends Component {

  state = {
      loginView: true
  }

  toggleAuthView = (e) => {
    e.preventDefault();
    this.setState({
      loginView: !this.state.loginView
    });
  }

  render() {
    return (
      <Container className={classes.LoginContainer}>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <Card>
              <Card.Header className={classes.CardHeader}>
                Bienvenido a Magic Local Market
              </Card.Header>
              <Card.Body>
                {this.state.loginView ? <Login /> : <Register />}
              </Card.Body>
              <Card.Footer className="text-center">
                <a href="/#" onClick={(e) => this.toggleAuthView(e)}>
                  {this.state.loginView ? 'Regístrate' : 'Iniciar Sesión'}
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
}

export default Auth;

/*import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

<GoogleLogin
  clientId="380545519718-ilk9ar780m6blkh8sv7smbaske2rc6fl.apps.googleusercontent.com"
  buttonText="Login with Google"
  onSuccess={responseGoogle}
  onFailure={responseGoogle}
  cookiePolicy={'single_host_origin'}
/>
*/
