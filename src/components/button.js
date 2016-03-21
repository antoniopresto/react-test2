/*eslint-disable*/
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Botao extends Component {
  render(){
    let margin = {marginTop: "10px", marginLeft: "15px"}
    const {classe, texto, size} = this.props;
    return (
          <Button bsStyle={classe} bsSize={size} style={margin}>{texto}</Button>
    );
  }
}
