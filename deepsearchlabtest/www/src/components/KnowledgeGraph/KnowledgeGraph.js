import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './KnowledgeGraph.module.css';

import * as d3 from 'd3';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import _ from 'lodash';


class KnowledgeGraph extends React.Component {

  currentRef = React.createRef();

  constructor(props) {
    super(props);
  }


  drawGraph() {
    if (!this.props.graph[0]) return;

    const graph = this.props.graph[0]['graph'];

    const width = this.props.width;
    const height = Math.min(width, width * 0.6);

    const svg = d3.select(this.currentRef.current);
    svg.selectAll('*').remove();

    svg
      .attr("viewBox", [0, 0, width, height])
      .style("cursor", "crosshair")
      .call(d3.zoom().on("zoom", e => g.attr("transform", e.transform)));

    const g = svg.append('g');

    const edge = g
      .selectAll(".link")
      .data(graph.edges)
      .join("line");

    edge.attr("stroke-width", (d) => Math.sqrt(d.value));

    const vertex = g
      .selectAll(".node")
      .data(graph.vertices)
      .join("g")
      .call(
        d3.drag()
          .on("start", (e, d) => {
            if (!e.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (e, d) => {
            d.fx = e.x;
            d.fy = e.y;
          })
          .on("end", (e, d) => {
            if (!e.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    vertex.append("circle")
      .attr("r", (d) => Math.sqrt(d.total))
      .attr("fill", (d) => d.positive >= d.negative ? 'green' : 'red')
      .style("cursor", "pointer")
      .on('click', function (e, d) {
        if (this.props.onShowWordDetails) {
          this.props.onShowWordDetails(d);
        }
      }.bind(this));

    var lables = vertex.append("text")
      .text((d) => d.word)
      .attr('x', (d) => 10)
      .attr('y', 3);

    var simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink().id((d) => d.id).distance(300))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulation
      .nodes(graph.vertices)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.edges);

    function ticked() {
      edge
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", d => d.sentence_sentiment_label ? 'green' : 'red')
        .attr("stroke-width", d => 2 * d.sentence_sentiment_net);

      vertex.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    }


  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.graph, this.props.graph)) {
      this.drawGraph();
    }
  }

  render() {

    return <Row>
      <Col className={`${styles.GraphZone} w-100 col`}>
        <svg className={`h-100 w-100`} ref={this.currentRef}></svg>
      </Col>
    </Row>
  }
}


KnowledgeGraph.propTypes = {};

KnowledgeGraph.defaultProps = {
  width: 0,
  height: 0
};

export default KnowledgeGraph;
