import { useState,useEffect} from 'react';
import './Login.css';
import {isCorrectEmail,isCorrectPassword,isCorrectName} from '../utils/Regex.js'
import { useNavigate } from "react-router-dom";
import {isDuplicatedId,registerUser} from '../api/MemberAPI'
import axios from "axios"
import '../utils/Constant.js'
import { errorText } from '../utils/Constant.js';


const Signup=function(){
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [passwordCheck,setPasswordCheck]=useState("")
    let [name,setName]=useState("")
    let [ems,setems]=useState("")
    let isIdconfirmed=true;
    let isPwconfirmed=true;
    let isPwCheckconfirmed=true;
    let isNameconfirmed=true;
    let navigate = useNavigate();

    function detectEmail() {
        if(email===""){
            setems("")
            isIdconfirmed=false;
            //return sentence;
        }
        else if(!isCorrectEmail(email)){
            setems(<span style={{color:'red', fontSize : '14px'}}>이메일 형식에 알맞게 작성해주세요.</span>)
            isIdconfirmed=false;
            //return sentence;
        }
        else{
            isIdconfirmed=true;
            setems(<span style={{color:'orange', fontSize : '14px'}}>중복검사중입니다...</span>)
            let result=Promise.resolve(isDuplicatedId(email))
            result.then(value=>{
                console.log(value)
                if(value){
                    setems(<span style={{color:'red', fontSize : '14px'}}>이미 등록된 email주소입니다.</span>)
                }
                else if(value===false){
                    setems(<span style={{color:'green', fontSize : '14px'}}>사용가능한 email주소입니다.</span>)
                }
                else {
                    setems(<span style={{color:'red', fontSize : '14px'}}>서버에 에러가 발생했습니다.</span>)
                }
            }).catch(error=>{
                setems(<span style={{color:'red', fontSize : '14px'}}>서버에 에러가 발생했습니다.</span>)
                isIdconfirmed=true;
            })
        }
    }
    useEffect(()=>{
        detectEmail();
    },[email]);

    function detectPassword(){
        let sentence=""
        if(password===""){
            sentence="";
            isPwconfirmed=false;
        }
        else if(!isCorrectPassword(password)){
            sentence=<span style={{color:'red', fontSize : '14px'}}>하나 이상의 문자,숫자,특수문자를 조합해 6~20자 비밀번호를 만들어주세요.</span>
            isPwconfirmed=false;
        }
        else{
            sentence = <span style={{color:'green', fontSize : '14px'}}>사용가능한 비밀번호입니다.</span>
            isPwconfirmed=true;
        }
        return sentence;
    }

    function detectPasswordCheck(){
        let sentence=""
        if(passwordCheck===""||isPwconfirmed===false){
            sentence="";
            isPwCheckconfirmed=false;
        }
        else if(passwordCheck!==password){
            sentence=<span style={{color:'red', fontSize : '14px'}}>비밀번호를 동일하게 입력해주세요.</span>
            isPwCheckconfirmed=false;
        }
        else{
            sentence = <span style={{color:'green', fontSize : '14px'}}>확인되었습니다.</span>
            isPwCheckconfirmed=true;
        }
        return sentence;
    }

    function detectName(){
        let sentence=""
        if(name===""){
            sentence=""
            isNameconfirmed=false;
        }
        else if(!isCorrectName(name)){
            sentence=<span style={{color:'red', fontSize : '14px'}}>2~5글자의 한글을 입력해주세요.</span>
            isNameconfirmed=false;
        }
        else{
            sentence = <span style={{color:'green', fontSize : '14px'}}>확인되었습니다.</span>
            isNameconfirmed=true;
        }
        return sentence
    }

    function signUpBtnClicked(){
        if(isIdconfirmed===true&&isPwconfirmed===true&&isPwCheckconfirmed===true&&isNameconfirmed===true){
            //console.log(email,password,name)
            let result=registerUser(email,password,name)
            result.then(value=>{
                console.log(value)
                if(value==="success"){
                    alert("가입이 완료되었습니다!")
                    navigate("/")
                }
                else if(value==="duplicated"){
                    alert("이미 가입이 완료된 사용자 입니다!")
                }
                else{
                    alert("서버에 에러가 발생했습니다!")
                }
            }).catch(error=>{
                alert("서버에 에러가 발생했습니다!")
            })
        }
        else{
            alert("회원가입 양식에 맞게 입력해주세요!")
        }
    }

    return(
        <div>
            <div className="top">
            </div>
            <div className="Auth-form-container">
                <img src="assets/images/leftCrab.png" width="150px"/>
                <div>
                    <div className="Logo-style">
                        <p className="Signup-sentence">Welcome to Lobster!</p>
                    </div>
                    <div className="Auth-form">
                        <h3 className="Auth-form-title">회원가입</h3>
                        <div className="Auth-form-content">
                            <div className="form-group mt-3">
                                <label>이메일</label>
                                <input maxLength='30'
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="이메일을 입력해주세요"
                                    value={ email }
                                    onChange={e => setEmail(e.target.value)}
                                />
                                { ems }
                            </div>

                            <div className="form-group mt-3">
                                <label>비밀번호</label>
                                <input maxLength='20'
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="비밀번호를 입력해주세요"
                                    value={ password }
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {detectPassword()}
                            </div>

                            <div className="form-group mt-3">
                                <label>비밀번호 확인</label>
                                <input maxLength='20'
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="비밀번호를 한번 더 입력해주세요."
                                    value={ passwordCheck }
                                    onChange={e => setPasswordCheck(e.target.value)}
                                />
                                {detectPasswordCheck()}
                            </div>

                            <div className="form-group mt-3">
                                <label>이름</label>

                                <input maxLength='5'
                                    type="name"
                                    className="form-control mt-1"
                                    placeholder="이름을 입력해주세요"
                                    value={ name }
                                    onChange={e => setName(e.target.value)}
                                />
                                {detectName()}
                            </div>
                            <div></div>
                            <div className="d-grid gap-2 mt-4">
                            
                            <button className="btn btn-primary btn-lg" onClick={signUpBtnClicked} >
                                가입하기
                            </button>
                            </div>
                            <div className="mt-3 col" >
                                    <span style={{fontSize:'14px'}}>계정이 이미 있으신가요? </span>
                                    <a href="/" style={{fontSize:'14px'}}>로그인하기</a>
                            </div>  
                        </div>
                    </div>
                    <div className='tail'>
                        <img src="assets/images/tail.png" width="300px"/>
                    </div>
                </div>
                <img src="assets/images/rightCrab.png" width="140px"/>
            </div>
        </div>
    );
}

export default Signup;