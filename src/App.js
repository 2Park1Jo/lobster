import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Workspace from './components/Workspace';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/workSpace" element={ <Workspace />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
