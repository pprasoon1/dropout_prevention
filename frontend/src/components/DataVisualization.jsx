import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function DataVisualization({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      const svg = d3.select(svgRef.current);
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const x = d3.scaleBand()
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top]);

      x.domain(data.map(d => d.student));
      y.domain([0, d3.max(data, d => d.attendance)]);

      svg.selectAll('*').remove();

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.student))
        .attr('y', d => y(d.attendance))
        .attr('width', x.bandwidth())
        .attr('height', d => height - margin.bottom - y(d.attendance))
        .attr('fill', 'steelblue');
    }
  }, [data]);

  return <svg ref={svgRef} width="600" height="400"></svg>;
}

export default DataVisualization;