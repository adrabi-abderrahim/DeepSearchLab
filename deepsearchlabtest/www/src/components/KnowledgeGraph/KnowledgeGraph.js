import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './KnowledgeGraph.module.css';

import * as d3 from 'd3';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';


class KnowledgeGraph extends React.Component {

  currentRef = React.createRef();

  constructor(props) {
    super(props);
  }

  drawGraph(graph = { vertices: [], edges: [] }, width = 800) {
    const height = Math.min(width, width * 0.6);
    const svg = d3.select(this.currentRef.current);
    svg.attr("viewBox", [0, 0, width, height]);

    const edge = svg
      .selectAll(".link")
      .data(graph.edges)
      .join("line");

    edge.attr("stroke-width", (d) => Math.sqrt(d.value));

    const vertex = svg
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
      .attr("r", (d) => 20 * d.ratio)
      .attr("fill", (d) => d.color);

    var lables = vertex.append("text")
      .text((d) => d.id)
      .attr('x', (d) => 10 + (20 * d.ratio) / 2)
      .attr('y', 3);

    var simulation = d3
      .forceSimulation()
      .force("link", d3.forceLink().id((d) => d.id).distance(100))
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
        .attr("stroke", "#ccc")
        .attr("stroke-width", "0.5px");

      vertex.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    }
  }

  componentDidMount() {

    const width = 800;
    const graph = {
      "vertices": [
        { "id": "Myriel", "group": 1, "color": "red", "ratio": 0.5 },
        { "id": "Napoleon", "group": 1, "color": "blue", "ratio": 0.7 },
        { "id": "Mlle.Baptistine", "group": 1, "color": "green", "ratio": 1 },
        { "id": "Mme.Magloire", "group": 1, "color": "#aaa", "ratio": 0.2 },

      ],
      "edges": [
        { "source": "Napoleon", "target": "Myriel", "value": 1 },
        { "source": "Mlle.Baptistine", "target": "Myriel", "value": 8 },
        { "source": "Mme.Magloire", "target": "Myriel", "value": 10 },
        { "source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6 },

      ]
    };
    this.drawGraph(graph, width);
  }

  render() {
    return <Row>
      <Col className={`${styles.GraphZone} w-100 col`}>
        <svg className={`h-100 w-100`}  ref={this.currentRef}></svg>
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
