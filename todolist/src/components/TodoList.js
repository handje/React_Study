import Todo from "./Todo.js";
const TodoList = ({ todos,setTodos }) => {
  return (
    <div className="todo-container">
      <ul id="todoList" className="todo-list">
        {todos.map((todo) => (
          <Todo text={todo.text} key={todo.id} todos={todos} setTodos={setTodos} todo={todo}></Todo>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
