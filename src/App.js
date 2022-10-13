import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Login /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
