import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

import { Button } from 'components';
import { ButtonDropdown } from 'components';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./App.scss');
    const imgLogo = require('../Home/inceres_logo.png');
    const imgImportar = require('../Home/import.png');
    const imgTime = require('../Home/time.png');
    const imgSair = require('../Home/cancel.png');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <p>Fazenda Boa Vista</p>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <Button classe="default" texto="Selecionar Time" size="default"/>&nbsp;&nbsp;
              <a href="#" className="btn btn-primary" style={{marginTop: "10px", height: "34px", fontSize: "15px"}}><img src={imgImportar} style={{marginTop: "-5px"}}/>&nbsp;&nbsp;Importar</a>&nbsp;&nbsp;
              <a href="#" className="btn btn-default" style={{marginTop: "10px"}} size="default"><img src={imgTime} style={{width: "24px"}}/></a>
              <Button classe="default" texto="Ajuda" size="default"/>&nbsp;&nbsp;
              <a href="#" className="btn btn-default" style={{marginTop: "10px"}}><img src={imgSair}/>&nbsp;&nbsp;Sair</a>
              <ButtonDropdown titulo="Camadas" size="default"/>
              <ButtonDropdown titulo="Layout" size="default"/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
