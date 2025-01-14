import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 로컬스토리지에 값을 가져오기

//2. 로그인구현

//3. 로그아웃구현

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  // token,email
  const [email,setEmail] = useState(localStorage.getItem('email'));
  const [token,setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    //초기화 시 localStroage 의 값을 가져오기
    if(token && email){
      const storedMember = localStorage.getItem('email');
      setEmail(storedMember);
    }
  },[token,email])
  const login = (email,token)=>{
    setEmail(email);
    setToken(token);

    localStorage.setItem('token',token);
    localStorage.setItem('email',email);
    //로그인 처리후 리디렉션
    navigate('/dashboard');
  }
  const logout = (email,token)=>{
    setEmail(null);
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    //로그인 처리후 리디렉션
    navigate('/dashboard');
  }
  return (
    <div>
      <AuthContext.Provider value={{email,token,login,logout}}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export const useAuth = () => useContext(AuthContext);
