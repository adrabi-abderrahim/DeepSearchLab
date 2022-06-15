import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './GenerationZ.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import KnowledgeGraph from '../KnowledgeGraph/KnowledgeGraph.lazy';
import WordDetails from '../WordDetails/WordDetails';


class GenerationZ extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories : [],
      selectedCategory : '',
      selectedWord : '',
      currentWord: '',
      graph: []
    }
  }

  filterHandler = (e) => {
    const params = {}
    if(this.state.selectedCategory){
      params['category'] = this.state.selectedCategory;
    }
    if(this.state.selectedWord){
      params['word'] = this.state.selectedWord;
    }

    fetch('http://127.0.0.1:8000/api/genz/graph/filter?' + new URLSearchParams(params))
      .then(response => response.json())
      .then(json => this.setState({graph : json}));
  }

  selectedCategoryHandler = (e) => {
    this.setState({selectedCategory: e.target.value});
  }

  selectedWordHandler = (e) => {
    this.setState({selectedWord: e.target.value});
  }

  showWorDetails = (d) => {
    this.setState({currentWord: d});
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/genz/graph/categories')
      .then(response => response.json())
      .then(json => this.setState({categories: json['categories']}));
  }

  render() {
    return (
      <Container fluid className={styles.GenerationZ}>
        <Row>
          <Col xs={9}>
            <KnowledgeGraph graph={this.state.graph} width='1000' onShowWordDetails={this.showWorDetails}></KnowledgeGraph>
          </Col>
          <Col className='border'>
            <div className='h2 text-center'>
              Generation Z
            </div>
            <hr />
            <Form>
              <Form.Select
                id="selectCategory"
                aria-label="Default select category"
                aria-describedby='categoryHelpBlock'
                onChange={this.selectedCategoryHandler}
              >
                <option> Select a category </option>
                {
                  this.state.categories.map((category) => <option value={category} key={category}> {category} </option>)
                }
              </Form.Select>
              <Form.Text id="categoryHelpBlock" muted>
                Select a category to select all ``words`` belong to that category and display all
                ``words`` connected to them.
              </Form.Text>
              <hr />
              <Form.Control
                type="text"
                id="inputWord"
                aria-describedby="wordHelpBlock"
                placeholder='Enter a word'
                onChange={this.selectedWordHandler}
              />
              <Form.Text id="wordHelpBlock" muted>
                Enter a ``word`` to filter by it and display all ``words`` connected to it.
              </Form.Text>
              <div className="pt-2 pb-2 d-grid gap-2">
                <Button onClick={this.filterHandler}>Filter</Button>
              </div>
              <div className='text-center text-danger'>Use mouse to zoom and pan.</div>
              <div className='h2 text-center'>Word details</div>
              <div className='text-center text-danger'>(Click on vertices to show their details)</div>
              <hr />
              <WordDetails word={this.state.currentWord}></WordDetails>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

GenerationZ.propTypes = {};

GenerationZ.defaultProps = {};

export default GenerationZ;
