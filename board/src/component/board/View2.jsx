import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const View2 = () => {
  const navigate = useNavigate();
  const param = useParams();
  const num = param.num;
    const {data,loading,error,req} = useAxios();
    //effect >> api 호출
    useEffect(() => {
      (async() => {
        const resp = await req('get',`notes/${num}`);
        console.log(resp);
      })();
    },[num,req]);

    const handleSubmit = e => {
      e.preventDefault();
      navigate("/list");
    }

    if(error){
      console.log(error);
      return <div><h1>에러발생</h1></div>
    }
    if(loading){
      return <div><h1>로딩중</h1></div>
    }

    const handleDelete = e => {
      e.preventDefault();
      if(!window.confirm("삭제 하시겠습니까?")){
        return;
      }
      req('delete',`notes/${num}`);
      navigate('/list',{ replace: true });
    }
    const handleModify = e => {
      e.preventDefault();
      navigate("/modify");
    }
  return data &&(
    <div>
    <form onSubmit={handleSubmit}>
    <h1>View</h1>
    <p>{num}</p>
    <input type='text' placeholder='글제목' name='title' id="title" value={data.title} readOnly/>
    <input type='text' placeholder='글내용' name="content" id="content" value={data.content} readOnly/>
    <input type='text' placeholder='글작성자'name="memberEmail" id="memberEmail" value={data.writer} readOnly/>
    <p></p>
    <Link to={`/modify/${data.num}`}><button>수정</button></Link>

    <div>
      <h3>attach : {data.attachDtos.length}</h3>
      <ul>
        {data.attachDtos.map(a => <li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
      </ul>
    </div>
    <button >글목록</button> <button onClick={handleDelete}>삭제</button>
    </form>
  </div>
  );
}

export default View2;
