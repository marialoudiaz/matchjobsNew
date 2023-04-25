import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Views/Welcome"
import Login from "./Views/Login"
import Register from "./Views/Register"
import ProfileApplicant from './Views/ProfileApplicant';
import ProfileRecruiter from './Views/ProfileRecruiter';

function App() {
  return (
    <div className="App">
     
<Router>
{/* We need to use the Routes wrapper */}
  <Routes>
{/* For every URL we can render a separate component */}
    <Route path="/" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<ProfileApplicant />} />
    <Route path="/profile" element={<ProfileRecruiter />} />
    </Routes>
</Router>

    </div>
  );
}

export default App;
