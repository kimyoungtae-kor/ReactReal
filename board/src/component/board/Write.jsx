import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';
const Write = () => {

  const { email } = useAuth();
  const navigate = useNavigate();
  const [uploaded,setUploaded] = useState([]);
  const { req } = useAxios();
  

  const [ board, setBoard ] = useState({
    title:'',
    content:'',
    writer: email,
    attachDtos: []}
  );

  const handleChange = e => {
    const {name, value} = e.target;
    setBoard({...board, [name] : value});
  }

  const handleSubmit = e => {
      console.log(board);
      req('post','notes/register',{...board,attachDtos : uploaded});
    

    alert("글쓰기 성공");
    navigate("/list");
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    
    if (!files) return;
    console.log(files);


    const formData = new FormData();
    for(let i = 0; i < files.length; i++){
      formData.append('file', files[i]);
    }
    console.log(formData);

    try {

      const result = await req("post", "file/upload", formData, {'Content-Type' : 'multipart/form-data'})
      console.log(result);
      setUploaded([...uploaded,...result]);


    } catch (error) {
      console.error("Error during upload:", error);
    }

    e.target.value = '';//선택된 파일없음 쉽게만듬
  };

  return (
    <div>
      <h1>Write</h1>
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }} encType=''>
        <input type='text' name="title" value={board.title} onChange={handleChange}/>
        <input type='text' name="content" value={board.content} onChange={handleChange}/>
        <input type='text' name="memberEmail" value={board.writer} onChange={handleChange}/>
        <button>클릭</button>
        <input type='file' onChange={handleFileUpload} name='file' multiple />
      </form>
      <ul>
        {uploaded.map(u => <li key={u.uuid}><Link to={u.url}>{u.origin}</Link>
        {u.s3Key}<button data-uuid={u.uuid} onClick={e => setUploaded(uploaded.filter(file => file.uuid !== e.currentTarget.dataset.uuid)) }>삭제</button></li>)}
      </ul>
    </div>
  );
}

export default Write;
