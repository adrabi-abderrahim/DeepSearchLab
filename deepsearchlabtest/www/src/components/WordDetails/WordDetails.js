import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import styles from './WordDetails.module.css';
import _ from 'lodash';


class WordDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id : '',
      word: '',
      categories: [],
      positive: '',
      negative: ''
    };
  }

  componentDidUpdate(prevProps){
    if(!_.isEqual(prevProps.word, this.props.word)){
      this.setState({
        id : this.props.word.id,
        word: this.props.word.word,
        categories: this.props.word.categories,
        positive: this.props.word.positive,
        negative: this.props.word.negative
      });
    }
  }

  render(){
    return(
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className='col-1'>ID</td>
            <td>{this.state.id}</td>
          </tr>
          <tr>
            <td className='col-1'>Word</td>
            <td>{this.state.word}</td>
          </tr>
          <tr>
            <td className='col-1'>Categories</td>
            <td>
              {
                this.state.categories.join(', ')
              }
            </td>
          </tr>
          <tr>
            <td className='col-1'>Positive</td>
            <td>{this.state.positive}</td>
          </tr>
          <tr>
            <td className='col-1'>Negative</td>
            <td>{this.state.negative}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

WordDetails.propTypes = {};

WordDetails.defaultProps = {};

export default WordDetails;
