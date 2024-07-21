import { Handle, Position } from '@xyflow/react';
// import { useCallback, ChangeEvent } from 'react';

export function CustomNode({
  data,
  isConnectable,
}: {
  data: { value: string | number };
  isConnectable: boolean;
}) {
  // const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
  //   console.log(evt.target.value);
  // }, []);

  // const handleStyle = { top: 50 };

  return (
    <div className="custom-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="custom-node__data">{data.value}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      /> */}
    </div>
  );
}
