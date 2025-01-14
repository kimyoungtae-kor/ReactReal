import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
const LoginForm = () => {
  // state
  // const [member,setMember] = useState({
  //   email :'',
  //   password : ''
  // });
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 
  // const navigate = useNavigate();
  const {data,loading,error,req} = useAxios('http://localhost:8080/api/');

  const {login} = useAuth();
  const handleSubmit = async e => {

    e.preventDefault(); 
    const member = {email,password};
    console.log(member);
    try {
      

      const resp = await req('get',`login?email=${email}`);
      resp && login(email,resp);
      // //1. email
      // localStorage.setItem('email',email);
      // //2. token
      // localStorage.setItem('token',resp);
      // resp && navigate("/dashboard");
    } catch (error) {
      console.error("로그인 실패",error.message);
    }
  }



  const handleChage = e => {
    // const {name,value} = e.target;
    const value = e.target.value;
    console.log(e.target.value);
    setEmail(value)
  }
  const handleChage2 = e => {
    // const {name,value} = e.target;
    const value = e.target.value;
    console.log(e.target);
    // setMember({...member, [name] : value})
    setPassword(value);
  }
  // if(error){
  //   console.log(error);
  //   return <div><h1>에러발생</h1></div>
  // }
  // if(loading){
  //   return <div><h1>로딩중</h1></div>
  // }
  return (
    // onchange={e => setEmail(e.target.value)}
     <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>email :</label>
          <input type='text' id='email' name='email' value={email} onChange={handleChage}/>
        </div>
        <div>
          <label htmlFor='password'>password :</label>
          <input type='text' id='password' name='password' value={password} onChange={handleChage2}/>
        </div>
        <div>
          <button disabled={loading}>{loading ? '로그인 중 ...' : '로그인'}</button>
          {error && <p style={{color:'red'}}>에러발생 {error.message}</p>}
        </div>
     </form>
    
  );
}

export default LoginForm;
