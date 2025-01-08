import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
const Write = () => {
  // const [title,setTitle] = useState('');
  // const [content,setContent] = useState('');
  // const [memberEmail,setMemberEmail] = useState('');
  const [board,setBoard] = useState({
    title :'',
    content : '',
    memberEmail : ''
  });

  const navigate = useNavigate();
  const {req} = useAxios();
  const handleChage = e => {
    const {name,value} = e.target;
    setBoard({...board, [name] : value})
  }
  const handleSubmit = e => {
    e.preventDefault();
    console.log(board);
    req('post','board',board);
    alert('글쓰기 성공');
    navigate("/");
  }
  
    //   (async () => {
    //   try {
    //    const resp = await axios({
    //     url : 'http://localhost:8080/api/v1/board',
    //     method : 'post',
    //    }); 
    //   } catch (error) {

    //   } finally{

    //   }
    // })();
    //   //언마운트 시 할일
    //   return () => {
  
    //   };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Write</h1>
      <input type='text' placeholder='글제목' name='title' id="title"onChange={handleChage} value={board.title}/>
      <input type='text' placeholder='글내용' name="content" id="content"onChange={handleChage} value={board.content}/>
      <input type='text' placeholder='글작성자'name="memberEmail" id="memberEmail"onChange={handleChage} value={board.memberEmail}/>
      <button >글목록</button>
      </form>
    </div>
    
  );
}

export default Write;
