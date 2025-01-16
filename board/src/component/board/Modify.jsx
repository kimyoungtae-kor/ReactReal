import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';

const Modify = () => {
  const navigate = useNavigate();
  const param = useParams();
  const num = param.num;
  const {req,loding} = useAxios();
  const [uploaded,setUploaded] = useState([]);
  const {email} = useAuth();
    const [board,setBoard] = useState({
      title :'',
      content : '',
      writer : '',
      attachDtos : []
    });
  useEffect(() => {
    (async () =>{
      const resp = await req('get',`notes/${num}`);
      console.log(resp);
      setBoard(resp);
      setUploaded(resp.attachDtos)
      
    })();
  },[req,num])
    // const {data,loading,error,req} = useAxios();
    //   useEffect(() => {
    //    req('put',`notes/${num}`);
    //   },[num]);
    //   console.log(data);

    const handleSubmit = e => {
      e.preventDefault();
      req('put',`notes/${num}`,{...board , attachDtos: uploaded});
      alert("수정 성공");
      navigate("/list");
    }
    const handleChage = e => {
      const {name,value} = e.target;
      setBoard({...board, [name] : value})
    }
    console.log(board);
    // if(error){
    //   console.log(error);
    //   return <div><h1>에러발생</h1></div>
    // }
    // if(loading){
    //   return <div><h1>로딩중</h1></div>
    // }
    const handleUpdate = e => {
      e.preventDefault();
      navigate("/modify");
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
    <form >
    <h1>Modify</h1>
    
    <p>{num}</p>
    <input type='text' placeholder='글제목' name='title' id="title" onChange={handleChage} value={board.title} />
    <input type='text' placeholder='글내용' name="content" id="content" onChange={handleChage} value={board.content}/>
    <input type='text' placeholder='글작성자'name="memberEmail" id="memberEmail" value={board.writer}readOnly/>
    <div>
          <h3>attach : {board.attachDtos.length}</h3>
          <ul>
            {board.attachDtos.map(a => <li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
          </ul>
    </div>
    <button onClick={handleSubmit}>글목록</button> <button onClick={handleSubmit}>수정</button>
    <hr/>
    <input type='file' onChange={handleFileUpload} name='file' multiple />
      <ul>
            {uploaded.map(u => <li key={u.uuid}><Link to={u.url}>{u.origin}</Link>
            {u.s3Key}<button data-uuid={u.uuid} onClick={e => setUploaded(uploaded.filter(file => file.uuid !== e.currentTarget.dataset.uuid)) }>삭제</button></li>)}
          </ul>
    </form>
    
  </div>
  );
}

export default Modify;
