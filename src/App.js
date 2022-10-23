import { Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./containers/DefaultLayout";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
