
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Write from './component/board/Write';
import NotFound from './component/common/NotFound';
import List from './component/board/List';
import LoginForm from './component/member/LoginForm';
import Dashboard from './component/common/Dashboard';
import ProtectedRoute from './component/common/ProtectedRoute';
import { AuthProvider } from './component/hooks/AuthContext';
import View2 from './component/board/View2';
import Modify from './component/board/Modify';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>

        <Route path="/" element={<LoginForm/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/list" element={
          <ProtectedRoute>
          <List/>
          </ProtectedRoute>
          }/>
          <Route path="/view/:num" element={
          <ProtectedRoute>
          <View2/>
          </ProtectedRoute>
          }/>
          <Route path="/modify/:num" element={
          <ProtectedRoute>
          <Modify/>
          </ProtectedRoute>
          }/>
        <Route path="/write" element={
          <ProtectedRoute>
          <Write/>
          </ProtectedRoute>
          }/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
