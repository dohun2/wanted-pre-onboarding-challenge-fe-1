import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import TodoList from "./pages/TodoList";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
