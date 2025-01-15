import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';

const Modify = () => {
  const navigate = useNavigate();
  const param = useParams();
  const num = param.num;
  const {req} = useAxios();
  const {email} = useAuth();
    const [board,setBoard] = useState({
      title :'',
      content : '',
      writer : ''
    });
  useEffect(() => {
    (async () =>{
      const resp = await req('get',`notes/${num}`);
      setBoard(resp);
      console.log(resp);
    })();
  },[req,num])
    // const {data,loading,error,req} = useAxios();
    //   useEffect(() => {
    //    req('put',`notes/${num}`);
    //   },[num]);
    //   console.log(data);

    const handleSubmit = e => {
      e.preventDefault();
      req('put',`notes/${num}`,board);
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
  return (
    <div>
    <form >
    <h1>Modify</h1>
    <p>{num}</p>
    <input type='text' placeholder='글제목' name='title' id="title" onChange={handleChage} value={board.title} />
    <input type='text' placeholder='글내용' name="content" id="content" onChange={handleChage} value={board.content}/>
    <input type='text' placeholder='글작성자'name="memberEmail" id="memberEmail" value={board.writer}readOnly/>

    <button onClick={handleSubmit}>글목록</button> <button onClick={handleSubmit}>수정</button>
    </form>
  </div>
  );
}

export default Modify;
