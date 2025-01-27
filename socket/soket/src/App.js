import logo from './logo.svg';
import './App.css';
import ToastMsg from'./ToastMsg'
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Test1 from './Test1';

function App() {
  
  return (
    
  <div>
    <BrowserRouter>
    <Toaster/>
    <Routes>
          <Route path="/" element={<ToastMsg />} />
          <Route path='/a' element={<Test1/>}/>
      </Routes>
    </BrowserRouter>
  </div>)
}

export default App;
