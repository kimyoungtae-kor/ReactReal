
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Write from './component/board/Write';
import NotFound from './component/common/NotFound';
import List from './component/board/List';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List/>}/>
        <Route path="/write" element={<Write/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
