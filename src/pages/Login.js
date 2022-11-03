import './Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getMemberData } from '../data/MemberData.js';
import { useRecoilState } from 'recoil';
import { getAllMemberData } from '../api/MemberAPI';
import { MemberViewModel } from '../models/view-model/MemberViewModel';
import { Member } from '../models/model/Member';
import { LOGIN_MEMBER } from '../recoil/Atoms';

const Login = function () {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [allMemberData, setAllMemberData] = useState([]);
    let navigate = useNavigate();
    let [loginMember, setLoginMember] = useRecoilState(LOGIN_MEMBER);
    const member = new Member();
    const memberViewModel = new MemberViewModel(member);
    
    function checkLoginSuccess() {
        for (let userIndex = 0; userIndex < allMemberData.length; userIndex++) {
            if (email == allMemberData[userIndex].email && password === allMemberData[userIndex].password){
                setLoginMember({
                    email: allMemberData[userIndex].email,
                    name: allMemberData[userIndex].name
                })
                navigate("/workSpaceBanner")
                return;
            }
        }
        alert("올바른 정보를 입력해주세요")
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            checkLoginSuccess();
        }
    };

    useEffect( () => {
        
        memberViewModel.update(getMemberData());
        // setAllMemberData(memberViewModel.getAll());
        getAllMemberData()
        .then(
            (res) => {
                setAllMemberData(res)
            }
        )

        console.log(allMemberData)
    },[])

    return(
        <div className="Auth-form-container">
            <div className="Auth-form">
            <h3 className="Auth-form-title">Lobster</h3>
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
                
                    <button className="btn btn-primary btn-lg" onClick={ checkLoginSuccess }>
                        로그인
                    </button>
                
                    </div>
                    
                    <div className="mt-3 col">
                    <span style={{fontSize:'14px'}}>계정이 없으신가요? </span>
                        <a href='/signup'>회원가입</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;