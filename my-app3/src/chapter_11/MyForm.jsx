import React, { useState } from 'react';



const MyForm = () => {
  const[name, setName] = useState('');
  const [req,setReq] = useState('');
  const [fruit,setFruit] =useState('');
  const [file,setFile] = useState([]);
  //let value = '';//상태 관리무시
  //Array.from
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(name)
    console.log(file.length);
    // if(fruit === ""){
    //   alert("과일을선택해주세요");
    // }
    if(file.length <= 4){
      alert("4개이상은 업로드못합니다");
    }

  }

  // const handleChage = (e) => {
  //   const v =e.target.value.toUpperCase();
  //   setValue(v);
  //   console.log(v);
  // }
  // const handleChage = (e) => {
  //   //숫자만입력받게 변형
  //   const regex = /^[0-9]*$/; // 숫자만 체크
  //   const v =e.target.value;
  //   if(regex.test(v)){
  //     setValue(v);
  //     console.log(v);
  //   }else{
  //     alert("숫자만입력해주세요");
  //   }
  // }
  const handleChange = (e) => {
    switch (e.target.id){
      case "name":
      setName(e.target.value.replace(/[^0-9]/g,''));
        break;
        // 영소문자 입력(소문자)(한글, 숫자도 가능)
      case "req" :
        setReq(e.target.value.toLowerCase());
        break;
        //반드시 과일을 선택하게 지정
        //과일 미선택시 alert로 알림 메세지 표시
      case "fruit" :
        setFruit(e.target.value);
        break;
      case "file" :
        console.log(Array.from(e.target.files, f => f.name));
        
        setFile(Array.from(e.target.files, f => f.name));

        break;
      default:
        break;
    }
    //replace를 이용했을때
    // new RegExp("[^0-9]","g").test("abc");
    // new RegExp("[^0-9]","g").test(123) && setValue(e.target.value);
    // e.target.value.match(/[0-9]/g)
   
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>이름 <input type='text' name='name' id='name' onChange={handleChange} value={name}/>
      <p>요청사항</p>
      <textarea onChange={handleChange} id='req' value={req}/>
      </label>
      <label htmlFor="fruit">과일을 선택하세요.</label>
      <select id='fruit' onChange={handleChange}>
        <option value=''>과일을 선택하세요</option>
        <option value={'banana'}>바나나</option>
        <option value={'grape'}>포도</option>
        <option value={'watermelen'}>수박</option>
      </select>
      <br/>
      <input type="file" id="file" name="file" multiple onChange={handleChange}/>
      <p>업로드된 파일</p>
      <ul>
        {file.map(f => <li key={f}>{f}</li>)}
      </ul>
      <button>제출</button>
    </form>
  );
}

export default MyForm;
