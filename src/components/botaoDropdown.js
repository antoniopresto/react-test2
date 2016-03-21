/*eslint-disable*/
import React, {Component} from 'react';
import {DropdownButton} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';

export default class BotaoDropDown extends Component {
  render(){
    let margin = {marginTop: "10px", marginLeft: "15px"}
    const {titulo, size} = this.props;
    return (
      <DropdownButton title={titulo} bsSize={size} style={margin}>
        <MenuItem eventKey="1">teste</MenuItem>
      </DropdownButton>
    );
  }
}
