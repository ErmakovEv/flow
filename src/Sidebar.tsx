type Props = {
  addNode: () => void;
};

const Sidebar = ({ addNode }: Props) => {
  return (
    <aside
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: 'green',
      }}
    >
      <button onClick={addNode}>Добавить узел</button>
    </aside>
  );
};

export default Sidebar;
