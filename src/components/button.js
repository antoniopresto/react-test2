/*eslint-disable*/
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Botao extends Component {
  render(){
    let margin = {marginTop: "10px", marginLeft: "15px"}    
    const {classe, texto} = this.props;
    return (
      <Button bsStyle={classe} style={margin}>{texto}</Button>
    );
  }
}
