import './Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { WORKSPACE_ID, ACCESSED_DEPARTMENT } from '../recoil/Atoms';
import { isLoginSuccessed } from '../api/MemberAPI';

const Login = function () {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const setWorkspaceId = useSetRecoilState(WORKSPACE_ID);
    const setAccessedDepartment = useSetRecoilState(ACCESSED_DEPARTMENT);
    let navigate = useNavigate();

    function checkLoginSuccess() {

        isLoginSuccessed(email, password)
        .then(response => {
            if(response.status === 200){
                localStorage.clear()
                localStorage.setItem('loginMemberEmail', email)
                // localStorage.setItem('token', res.data.token)
                navigate("/workSpaceBanner")
            }
        })
        .catch(error=>{
            if (error.response.status === 404){
                alert("올바른 정보를 입력해주세요")
            }
            else{
                alert("현재 서버에 이상이 있습니다. 관리자에게 문의하세요")
            }
        })
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            checkLoginSuccess();
        }
    };

    useEffect(() => {
        if(localStorage.length > 0){
            if (!localStorage.getItem('accessedWorkspaceId')){
                navigate("/workSpaceBanner")
            }
            else{
                setWorkspaceId(localStorage.getItem('accessedWorkspaceId'))
                setAccessedDepartment({
                    id: localStorage.getItem('accessedDepartmentId'),
                    name: localStorage.getItem('accessedDepartmentName')
                })
                navigate("/workspace/" + localStorage.getItem('accessedWorkspaceId') 
                + "/chat/department/" + localStorage.getItem('accessedDepartmentId'))
            }
        }
    }, []); 

    return(
        <div className="Auth-form-container">
            <img src="assets/images/leftCrab.png" width="160px" style={{paddingBottom:'380px'}}/>
            <div>
                <div className="Logo-style">
                    <p className="Login-sentence">Lobster</p>
                </div>
                <div className="Auth-form" style={{color:'white'}}>
                    <h3 className="Auth-form-title">로그인</h3>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label>이메일</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="이메일을 입력해주세요"
                                value={ email }
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>비밀번호</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="비밀번호를 입력해주세요"
                                value={ password }
                                onChange={e => setPassword(e.target.value)}
                                onKeyPress={ handleOnKeyPress }
                            />
                        </div>
                        <div className="d-grid gap-2 mt-5">
                    
                        <button className="btn btn-secondary btn-lg" onClick={ checkLoginSuccess }>
                            로그인
                        </button>
                    
                        </div>
                        
                        <div className="mt-3 col">
                        <span style={{fontSize:'14px', color:'white', paddingLeft:'15px'}}>계정이 없으신가요? </span>
                            <a href='/signup'>회원가입</a>
                        </div>
                    </div>
                </div>
                <div className='tail'>
                    <img src="assets/images/tail.png" width="300px"/>
                </div>
            </div>
            <img src="assets/images/rightCrab.png" width="150px" style={{paddingBottom:'400px'}}/>
        </div>
    );
}

export default Login;