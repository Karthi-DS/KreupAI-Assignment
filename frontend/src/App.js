import Home from "./components/Home";
import { BrowserRouter,Routes,Route, } from "react-router-dom";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import GradeTable from "./components/GradeTable";
import SubjectPage from "./components/Subject";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/addReport" element={<Form/>}/>
        <Route path="/grades" element={<GradeTable/>}/>
        <Route path="/subjects" element={<SubjectPage/>}/>
        <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
