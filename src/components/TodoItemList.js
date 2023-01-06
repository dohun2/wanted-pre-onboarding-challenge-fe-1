import { useState } from "react";
import Edit from "./Edit";

const TodoItemList = ({ title, content, id }) => {
  const [mode, setMode] = useState("default");

  const deleteTodo = () => {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("usetToken"),
      },
    });
  };
  return (
    <div className="TodoItemList">
      <div>
        {mode === "default" ? (
          <div onClick={() => setMode("detail")}>{title}</div>
        ) : (
          ""
        )}
        {mode === "detail" ? (
          <div onClick={() => setMode("default")}>{title}</div>
        ) : (
          ""
        )}
        {mode === "detail" ? <div>Content: {content}</div> : ""}
        {mode === "detail" ? (
          <button onClick={() => setMode("default")}>닫기</button>
        ) : (
          ""
        )}
        {mode === "edit" ? <Edit setMode={setMode} id={id} /> : ""}
        {mode !== "edit" ? (
          <button onClick={() => setMode("edit")}>수정</button>
        ) : (
          ""
        )}
        {mode !== "edit" ? <button onClick={deleteTodo}>삭제</button> : ""}
      </div>
    </div>
  );
};

export default TodoItemList;
