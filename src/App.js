import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert  from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('light');
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#313131';
    }else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  useEffect(() => {
    toggleMode();
    // eslint-disable-next-line
  }, []);
  
  const showAlert = (message, type)=>{
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar mode = {mode} toggleMode = {toggleMode}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} mode={mode} />}></Route>
              <Route exact path='/about' element={<About mode = {mode}/>}></Route>
              <Route exact path='/login' element={<Login showAlert={showAlert} mode = {mode}/>}></Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert} mode = {mode}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}
export default App;
