import {
  addEdge,
  type OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';

import { CustomEdge } from './CustomEdge';
import { CustomNode } from './CustomNode';

import Sidebar from './Sidebar';

const initialNodes = [
  {
    id: 'n1',
    type: 'customNode',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 50, y: 50 },
    data: { value: 'node 1' },
  },
  {
    id: 'n2',
    type: 'customNode',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 500, y: 500 },
    data: { value: 'node 2' },
  },
];
const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: 'n1',
    target: 'n2',
    sourceHandle: 'a',
    type: 'custom-edge',
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const edgeTypes = {
    'custom-edge': CustomEdge,
  };

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: 'custom-edge' }, eds)),
    [setEdges]
  );

  const addNode = () => {
    setNodes((nodes) => {
      const nodeId = nodes.length + 1;
      const newNode = {
        id: `n${nodeId}`,
        type: 'customNode',
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: {
          x: 0,
          y: 600,
        },
        data: { value: `node ${nodeId}` },
      };

      const newNodes = [...nodes, newNode];

      return newNodes;
    });
  };

  return (
    <div style={{ width: '90vw', height: '90vh', border: '1px solid black' }}>
      <Sidebar addNode={addNode} />
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ backgroundColor: '#B8CEFF' }}
      />
    </div>
  );
}
