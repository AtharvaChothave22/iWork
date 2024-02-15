
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Pages/Login';
import Customnavbar from './Components/Customnavbar';
import SignIn from './Components/SignIn and SignUp/SignIn';
import SignUp from './Components/SignIn and SignUp/SignUp.jsx';
function App() {
  return (
    
       <>
       <Customnavbar/>
        
        
          <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          </Routes>
         
      
        </> 
  );
  }

export default App;
