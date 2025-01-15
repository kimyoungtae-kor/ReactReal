import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';
const Write = () => {
  // const [title,setTitle] = useState('');
  // const [content,setContent] = useState('');
  // const [memberEmail,setMemberEmail] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedFileKey, setUploadedFileKey] = useState('');
  const {email,token} = useAuth();
  const [board,setBoard] = useState({
    title :'',
    content : '',
    writer : ''
  });

  const navigate = useNavigate();
  const {req} = useAxios();

  useEffect(() => {
    setBoard(prev => ({...prev,writer:email}));
  },[email])


  const handleChage = e => {
    const {name,value} = e.target;
    setBoard({...board, [name] : value})
  }
  const handleSubmit = e => {
    e.preventDefault();
    console.log(board);
    req('post','notes/register',board);
    alert('글쓰기 성공');
    navigate("/list");
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
    const handleFileUpload = async e => {
      const file = e.target.files[0];
      if(!file) return;
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
    
      try {
        const headers ={
          'Authorization' : `Bearer ${token}`
        }
        const response = await fetch("http://localhost:8080/api/v1/file/upload", {
          method: "POST",
          body: formData,
          headers
          
        });
    
        const result = await response.json();
        if (result.status === "success") {
          console.log("File uploaded successfully:", result.data);
        } else {
          console.error("Upload failed:", result.message);
        }
        const data = response.data;
      setUploadStatus(result.message);
      setUploadedFileKey(data);
      console.log("서버 응답:",uploadedFileKey);

      } catch (error) {
        console.error("Error during upload:", error);
      }
      
    };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1>Write</h1>
      <input type='text' placeholder='글제목' name='title' id="title"onChange={handleChage} value={board.title}/>
      <input type='text' placeholder='글내용' name="content" id="content"onChange={handleChage} value={board.content}/>
      <input type='text' placeholder='글작성자'name="memberEmail" id="memberEmail"onChange={handleChage} value={board.writer}/>
      <input type='file' onChange={handleFileUpload}/>
      <button >글목록</button>
      </form>
    </div>
    
  );
}

export default Write;
