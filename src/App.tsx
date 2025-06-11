import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import RegisterStudent from "./Pages/admin/RegisterStudents";
import Home from "./Pages/Home";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/admin/register/student" element={<RegisterStudent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
