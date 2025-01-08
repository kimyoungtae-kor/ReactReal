import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AttendanceBook from './chapter_10/AttendanceBook';
import MyForm from './chapter_11/MyForm';
import Multiple from './chapter_11/Multiple';
import Calculator from './chapter_12/Calculator';
import ProfileCard from './chapter_13/ProfileCard';
import Acommodate from './chapter_07/Acommodate';
const root = ReactDOM.createRoot(document.getElementById('root'));


// setInterval(() => {
  
  root.render(
    <>
      {/* <App /> */}
      {/* <MyElement /> */}
      {/* <Library /> */}
      {/* <Clock /> */}
      {/* <Welcome name="javaman" /> */}
      {/* <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} />
      <Comment author={{name:'작가명', avatarUrl: 'https://placehold.co/60x40'}} text="텍스트" date={new Date()} /> */}
      {/* <CommentList /> */}
      {/* <CityList /> */}
      {/* <Airbnb /> */}
      {/* <NotificationList /> */}
      {/* <Counter/ > */}
      {/* <MyArray /> */}
      {/* <MyObject /> */}
      {/* <MyEffect/> */}
      {/* <Toggle /> */}
      {/* <MyEvent /> */}
      {/* <LandingPage /> */}
      {/* <NumberList numbers={[1,2,3,4,5]} /> */}
      {/* <AttendanceBook /> */}
      {/* <Multiple/> */}
      {/* <Calculator/> */}
      {/* <ProfileCard/> */}
      <Acommodate/>
    </>
  );
// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
