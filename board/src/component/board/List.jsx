
import React, { useEffect} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const List = () => {
  const {data,loading,error,req} = useAxios();
  // effect >>api 호출
  const navigate = useNavigate();
  useEffect(() => {
   req('get','notes/listall');
  },[req]);
  
  if(error){
    console.log(error);
    return <div><h1>에러발생</h1></div>
  }
  if(loading){
    return <div><h1>로딩중</h1></div>
  }
  return (
    <div>
      <button onClick={()=>navigate('/write')}>글쓰기</button>
      <ul>
        {data && data.map(b => <Link to={`/view/${b.num}`} key={b.num}>{b.title}</Link>)}
      </ul>
    </div>
  );
}

export default List;
