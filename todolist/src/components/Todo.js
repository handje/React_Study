const Todo = ({ text,todo,todos,setTodos }) => {
  const HandleDelete=()=>{
    console.log(todo)
    setTodos(todos.filter(el=>el.id!==todo.id))
  }
  const HandleCompleted=()=>{
    setTodos(todos.map((item)=>{
      if(item.id===todo.id){
        return {
          ...item,completed:!item.completed
        }
      }
      return item;
    }))
  }
  return (
    <div className="todo">
      <li onClick={HandleCompleted} className={`todo-item ${todo.completed?"completed":""}`}>{text}</li>
      <button onClick={HandleDelete} className="delete-btn">❌</button>
    </div>
  );
};
export default Todo;
