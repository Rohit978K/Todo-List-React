const Todo = ({ todo, toggleTodo }) => {
  const handleTodoChange = () => {
    toggleTodo(todo.id);
  };
  return (
    <div className="form-check form-switch">
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          role="switch"
          checked={todo.complete}
          onChange={handleTodoChange}
        />
        {todo.name}
      </label>
    </div>
  );
};

export default Todo;
