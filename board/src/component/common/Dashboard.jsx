import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
const Dashboard = () => {
  const {email,token,logout} = useAuth();
  // navigate = useNavigate();
  // const [email,setEmail] = useState(localStorage.getItem('email'));
  // const [token,setToken] = useState(localStorage.getItem('token'));
  // console.log(email);
  // console.log(token);
  // const handleLogout = e => {
  //   e.preventDefault(); 
  //   // setItems,get Item , removeItem
  //   localStorage.removeItem('email');
  //   localStorage.removeItem('token');
  //   setEmail('guest');
  //   setToken('');
    
  // }
  // const handleLogin = e => {
  //   e.preventDefault(); 
  //   // setItems,get Item , removeItem
  //   navigate("/")
  // }
  return (
    <div>
      <h1>안녕하세요 시작페이지 입니다</h1>
      <p>{email || 'guest'}</p>
      <p>{token}</p>
      
      {email && token ? <><button onClick={logout}>로그아웃</button><Link to={'/list'}>게시글</Link></>: <Link to={'/'}>로그인</Link>}
      {/* {email && token ? <a href='/list'>리스트</a> : ''} */}
    </div>
  );
}

export default Dashboard;
