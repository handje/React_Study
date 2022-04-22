//input Form
const Form = ({ todos, setTodos, setInputData, inputData }) => {
  const HandleInputTodo = (event) => {
    setInputData(event.target.value);
  };
  const HandleSubmitTodo = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      { text: inputData, completed: false, id: Math.random() * 1000 },
    ]);
    setInputData("");
  };
  return (
    <form>
      <input
        type="text"
        className="todo-input"
        value={inputData}
        required
        placeholder="Today's work"
        onChange={HandleInputTodo}
      />
      <button onClick={HandleSubmitTodo} className="todo-button">
        Ok
      </button>
    </form>
  );
};
export default Form;
