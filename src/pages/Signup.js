import { useState,useEffect} from 'react';
import './Signup.css';
import {isCorrectEmail,isCorrectPassword,isCorrectName} from '../utils/Regex.js'
import { useNavigate } from "react-router-dom";
import {isDepulicatedId,registerUser} from '../api/memberAPI.js'
import axios from "axios"


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
            let result=Promise.resolve(isDepulicatedId(email))
            result.then(value=>{
                if(value){
                    setems(<span style={{color:'red', fontSize : '14px'}}>이미 등록된 email주소입니다.</span>)
                    isIdconfirmed=false;
                    console.log(true)
                    //return sentence;
                }
                else{
                    setems(<span style={{color:'green', fontSize : '14px'}}>사용가능한 email주소입니다.</span>)
                    isIdconfirmed=true;
                    console.log(false)
                    //return sentence;
                }
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
        if(passwordCheck===""){
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
            console.log(email,password,name)
            registerUser(email,password,name)
            alert("가입이 완료되었습니다!")
            navigate("/")
        }
        else{
            alert("회원가입 양식에 맞게 입력해주세요!")
        }
    }

    return(
        
        <div className="Auth-form-container">
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
        </div>
    );
}

export default Signup;