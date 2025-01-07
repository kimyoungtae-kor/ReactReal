import React, { useState } from 'react';


const TopingList = (props) =>{
  // const {topings} = props;
  // const [cnt, setCnt] = useState(0);
  const [mySet,setMySet] = useState(new Set());
  // const [checkedItems,setCheckedItems] = useState([]);
  const {topings,onSetMyTopings} = props;

  const handleChange = (e) => {
    // const c = e.target.checked;
    // if(c && cnt >=3){
    //   e.target.checked = false;
    //   alert("최대 3개 체크");
    //   return ;
    // }
    // setCnt(cnt +(c ? 1 : -1));
    // console.log(cnt);

    // const c = e.target.checked;
    // if(c && checkedItems.length >= 3){
    //   alert("최대 3개의 토핑");
    //   return;
    // }
    // // c ? setCheckedItems([...checkedItems,e.target.value]) : setCheckedItems(checkedItems.filter(ci => ci !== e.target.value));
    // setCheckedItems(items => c ? [...items, e.target.value] : items.filter(ci => ci !== e.target.value));
    // console.log(checkedItems);
    
    
    //Set 형태로 했을때
    
     const c = e.target.checked;
     if(c && mySet.size >= 3){
      alert("최대 3개의 토핑");
      return;
    }
    const newSet = new Set(mySet);
    c ? newSet.add(e.target.value) : newSet.delete(e.target.value);
    setMySet(newSet);

    onSetMyTopings(newSet);
    // c ? setMySet(items => new Set(items.add(e.target.value))) : setMySet(items => {items.delete(e.target.value); return new Set(items);});
  };

  // props.setMyTopings(Array.from(mySet));
  return topings.length === 0?<h1>토핑이없습니다 </h1>:(
    <>
    <h3>최대 선택 가능 토핑은 3개입니다</h3>
    <ul>
      
    {/* {topings.map((t,i) => <li key={i}><label><input type='checkbox' name='toping' value={t} onChange={handleChange} checked={checkedItems.includes(t)}/>{t}</label></li>)} */}
    {topings.map((t,i) => <li key={i}><label><input type='checkbox' name='toping' value={t} onChange={handleChange} checked={mySet.has(t)}/>{t}</label></li>)}

    </ul>
    </>
  );
  
  // <div>
    
  //   <input type='checkbox' value="bacon" name='베이컨'/><label>{props[0]}</label><br/>
  //   <input type='checkbox' value="bacon" name='베이컨'/><label>{props[1]}</label><br/>
  //   <input type='checkbox' value="bacon" name='베이컨'/><label>베이컨</label><br/>
  //   <input type='checkbox' value="bacon" name='베이컨'/><label>베이컨</label><br/>
  //   <input type='checkbox' value="bacon" name='베이컨'/><label>베이컨</label><br/>
  //   <input type='checkbox' value="bacon" name='베이컨'/><label>베이컨</label><br/>

  //   </div>
}

const Multiple = () => {
  const [myTopings, setMyTopings] = useState(new Set());
  const topings = ["베이컨","페퍼로니","파인애플","치즈","고구마","감자","새우","불고기"];
  return (
    <form onSubmit={e => {
      e.preventDefault();
      if(myTopings.size === 0){
        alert("최소 1개의 토핑을 선택하세요");
        return;
      }
      alert(`선택한 토핑은 ${Array.from(myTopings).join(", ")}`);
    }}>
      <TopingList topings = {topings} myTopings={myTopings} onSetMyTopings={setMyTopings}/>
      <button >주문</button>
    </form>
  );
}

export default Multiple;
