
import React, { useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const List = () => {
  const {data,loading,error,req} = useAxios();
  // effect >>api 호출
  const navigate = useNavigate();
  useEffect(() => {
   req('get','board/list');
  },[req]);
  if(error){
    return <div><h1>에러발생</h1></div>
  }
  if(loading){
    return <div><h1>로딩중</h1></div>
  }
  return (
    <div>
      <button onClick={()=>navigate('/write')}>글쓰기</button>
      <ul>
        {data.dtoList.map(b => <li key={b.bno}>{b.title}</li>)}
      </ul>
    </div>
  );
}

export default List;
