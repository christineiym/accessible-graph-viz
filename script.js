// script.js

// Define connections between nodes (edges)
const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 4, to: 7 },
    { from: 5, to: 8 },
    { from: 6, to: 9 },
    { from: 7, to: 10 },
    { from: 8, to: 10 }
  ];
  
  // Draw edges as lines between nodes
  function createEdge(fromNode, toNode) {
    const container = document.querySelector('.graph-container');
    const edge = document.createElement('div');
    edge.classList.add('edge');
    
    const fromRect = fromNode.getBoundingClientRect();
    const toRect = toNode.getBoundingClientRect();
  
    const x1 = fromRect.left + fromRect.width / 2;
    const y1 = fromRect.top + fromRect.height / 2;
    const x2 = toRect.left + toRect.width / 2;
    const y2 = toRect.top + toRect.height / 2;
    const length = Math.hypot(x2 - x1, y2 - y1);
  
    edge.style.width = `${length}px`;
    edge.style.left = `${x1}px`;
    edge.style.top = `${y1}px`;
    edge.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
  
    container.appendChild(edge);
    return edge;
  }
  
  // Attach edges to DOM and store reference
  const edgeElements = edges.map(edge => {
    const fromNode = document.querySelector(`[data-node="${edge.from}"]`);
    const toNode = document.querySelector(`[data-node="${edge.to}"]`);
    return {
      ...edge,
      element: createEdge(fromNode, toNode)
    };
  });
  
  // Focus event handler to highlight the selected node
  const nodes = document.querySelectorAll('.node');
  nodes.forEach(node => {
    node.addEventListener('focus', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
    });
  
    // Reset tab order and highlight path on pressing Enter
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        resetTabOrder(node);
      }
    });
  });
  
  // Reset tab order and highlight path from the specified node (BFS)
  function resetTabOrder(startNode) {
    clearHighlights(); // Clear previous highlights
    const visited = new Set();
    const queue = [startNode];
  
    let tabIndex = 1;
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (visited.has(currentNode)) continue;
      visited.add(currentNode);
  
      // Highlight the current node
      currentNode.classList.add('highlighted');
      currentNode.setAttribute('tabindex', tabIndex++);
  
      const currentNodeID = parseInt(currentNode.getAttribute('data-node'));
  
      // Enqueue connected nodes and highlight the connecting edge
      edges.forEach(edge => {
        if (edge.from === currentNodeID) {
          const neighbor = document.querySelector(`[data-node="${edge.to}"]`);
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            highlightEdge(edge);
          }
        } else if (edge.to === currentNodeID) {
          const neighbor = document.querySelector(`[data-node="${edge.from}"]`);
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            highlightEdge(edge);
          }
        }
      });
    }
  }
  
  // Highlight an edge by adding the 'highlighted-edge' class
  function highlightEdge(edge) {
    const edgeElement = edgeElements.find(e => e.from === edge.from && e.to === edge.to);
    if (edgeElement) {
      edgeElement.element.classList.add('highlighted-edge');
    }
  }
  
  // Clear all previous highlights from nodes and edges
  function clearHighlights() {
    nodes.forEach(node => node.classList.remove('highlighted'));
    edgeElements.forEach(edge => edge.element.classList.remove('highlighted-edge'));
  }
  