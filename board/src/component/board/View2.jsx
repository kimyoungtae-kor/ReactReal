import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/AuthContext';

const View2 = () => {
  const navigate = useNavigate();
  const param = useParams();
  const num = param.num;
  const {email} = useAuth();
  const {data,loading,error,req} = useAxios();
  // const {myLoading:loading} = useAxios;
  const [note,setNote] = useState({});
  const [myLike,setMyLike] = useState({});
  const [likesCnt, setLikesCnt] = useState(0); 
    //effect >> api 호출
    useEffect(() => {
      (async() => {
        setNote(await req('get',`notes/${num}`));
        const queryString = new URLSearchParams({email,num}).toString();
        setMyLike(await req('get',`likes?${queryString}`));
      })();
    },[num,req,email]);

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
    const handleLikesToggle = async e => {
      e.preventDefault();
      const ret = await req('post', `likes`, { email, num }); 
      setMyLike(!myLike); 
      setNote({...note,likesCnt:note.likesCnt + (ret.result ? -1 : 1)});
      // setLikesCnt(prev => (myLike ? prev - 1 : prev + 1));
    };
  return note &&(
    <div>
    <form onSubmit={handleSubmit}>
    <h1>View</h1>
    <p>{num}</p>
    <input type='text' placeholder='글제목' name='title' id="title" value={note.title} readOnly/>
    <input type='text' placeholder='글내용' name="content" id="content" value={note.content} readOnly/>
    <input type='text' placeholder='글작성자'name="memberEmail" id="memberEmail" value={note.writer} readOnly/>
    <p><button onClick={handleLikesToggle}>좋아요{note.likesCnt} <span style={{color:'red'}}></span>{myLike ? '♥': '♡'}</button></p>
    <Link to={`/modify/${note.num}`}><button>수정</button></Link>

    <div>
      <h3>attach : {note.attachDtos && note.attachDtos.length}</h3>
      <ul>
        {note.attachDtos && note.attachDtos.map(a => <li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
      </ul>
    </div>
    <button >글목록</button> <button onClick={handleDelete}>삭제</button>
    </form>
  </div>
  );
}

export default View2;
