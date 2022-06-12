import React from 'react';
import PropTypes from 'prop-types';
import styles from './GenerationZ.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KnowledgeGraph from '../KnowledgeGraph/KnowledgeGraph.lazy';

const GenerationZ = () => (
  <Container fluid className={styles.GenerationZ}>
      <Row>
        <Col xs={9}>
          <KnowledgeGraph></KnowledgeGraph>
        </Col>
        <Col className='border'>
          <div className='h2 text-center'>
            Generation Z
          </div>
          <hr></hr>

        </Col>
      </Row>
    </Container>
);

GenerationZ.propTypes = {};

GenerationZ.defaultProps = {};

export default GenerationZ;
