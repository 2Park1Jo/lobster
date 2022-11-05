import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Workspace from './pages/Workspace';
import Signup from './pages/Signup';
import WorkspaceSelection from './pages/WorkspaceSelection';
import SocketTest from './pages/SocketTest';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/workSpaceBanner" element={ <WorkspaceSelection /> } />
          <Route path="/workSpace/*" element={ <Workspace /> }/>
          <Route path="/signup" element={ <Signup /> }/>
          <Route path="/test" element={ <SocketTest /> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
