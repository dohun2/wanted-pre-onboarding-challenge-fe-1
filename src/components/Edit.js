import { useEffect, useState } from "react";

const Edit = ({ id, setMode }) => {
  const [todo, setTodo] = useState({ title: "", content: "" });

  const getTodoById = () => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("usetToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTodo(data.data));
  };

  const updataTodo = () => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("usetToken"),
      },
      body: JSON.stringify({
        title: todo.title,
        content: todo.content,
      }),
    });
    setMode("default");
  };

  useEffect(() => {
    getTodoById();
  }, []);

  return (
    <div>
      <input
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        value={todo.title}
        type="text"
      />
      <br />
      <textarea
        onChange={(e) => setTodo({ ...todo, content: e.target.value })}
        value={todo.content}
      />
      <br />
      <button onClick={updataTodo}>수정완료</button>
    </div>
  );
};

export default Edit;
