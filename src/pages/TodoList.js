import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

import TodoItemList from "../components/TodoItemList";

const TodoList = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [todoList, setTodoList] = useState([]);
  const todo = { title: "", content: "" };
  const [todos, setTodos] = useState(todo);

  const getTodos = () => {
    fetch("http://localhost:8080/todos", {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.data);
      });
  };

  const createTodo = () => {
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        title: todos.title,
        content: todos.content,
      }),
    });
    getTodos();
    setTodos(todo);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/auth", { replace: true });
  };

  getTodos();

  // 로그인 상태 확인후 리다이렉션
  if (!userToken) {
    alert("토큰이 없습니다. 로그인 페이지로 이동합니다.");
    return <Navigate to={"/auth"} replace={true} />;
  }

  return (
    <div className="TodoList">
      <h1>투두리스트 페이지</h1>
      <div className="TodoList-nav">
        <button className="TodoList-Btn TodoList-logout" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className="TodoList-inputBox">
        <br />
        <input
          onChange={(e) => {
            setTodos({ ...todos, title: e.target.value });
          }}
          value={todos.title}
          placeholder="todo title"
          type="text"
          name="title"
          id="title"
        />
        <br />
        <textarea
          onChange={(e) => {
            setTodos({ ...todos, content: e.target.value });
          }}
          value={todos.content}
          placeholder="content"
        ></textarea>
        <br />
        <button className="TodoList-Btn" onClick={createTodo}>
          추가하기
        </button>
      </div>

      <div>
        <h1>TODO LIST</h1>
        {todoList.map((e) => (
          <TodoItemList
            key={e.id}
            title={e.title}
            content={e.content}
            id={e.id}
            getTodos={getTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
