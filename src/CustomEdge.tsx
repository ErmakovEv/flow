import {
  useReactFlow,
  getStraightPath,
  BezierEdge,
  EdgeLabelRenderer,
  Position,
} from '@xyflow/react';

interface ICustomEdge {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  source: string;
  target: string;
}

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  source,
  target,
}: ICustomEdge) {
  const { setNodes, setEdges } = useReactFlow();
  const [, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BezierEdge
        id={`${id}`}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
      />
      <EdgeLabelRenderer>
        <button
          onClick={() => {
            setNodes((nodes) => {
              const nodeId = nodes.length + 1;
              const newNode = {
                id: `n${nodeId}`,
                type: 'customNode',
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                position: {
                  x: targetX - 200,
                  y: targetY - 200,
                },
                data: { value: `node ${nodeId}` },
              };

              setEdges((edges) => {
                const ids = id.split('-');
                console.log(edges);
                console.log('source', source);
                const edgeFirst = {
                  id: `${ids[0]}-${nodeId}`,
                  source: source,
                  target: `n${nodeId}`,
                  type: 'custom-edge',
                  sourceHandle: 'a',
                };

                const edgeSecond = {
                  id: `${nodeId}-${ids[1]}`,
                  source: `n${nodeId}`,
                  target: target,
                  type: 'custom-edge',
                  sourceHandle: 'a',
                };

                const newEdges = [
                  ...edges.filter((edge) => edge.id !== id),
                  edgeFirst,
                  edgeSecond,
                ];
                return newEdges;
              });

              const newNodes = [...nodes, newNode];

              return newNodes;
            });
          }}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          +
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
