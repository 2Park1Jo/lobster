import './Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getMemberData } from '../data/MemberData.js';
import { useSetRecoilState } from "recoil";
import { getAllMemberData } from '../api/MemberAPI';
import { MemberViewModel } from '../models/view-model/MemberViewModel';
import { Member } from '../models/model/Member';
import { LOGIN_MEMBER } from '../recoil/Atoms';

const Login = function () {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [allMemberData, setAllMemberData] = useState([]);
    let navigate = useNavigate();
    let setLoginMember = useSetRecoilState(LOGIN_MEMBER);
    const member = new Member();
    const memberViewModel = new MemberViewModel(member);

    function checkLoginSuccess() {
        for (let userIndex = 0; userIndex < allMemberData.length; userIndex++) {
            if (email == allMemberData[userIndex].email && password === allMemberData[userIndex].password){
                setLoginMember({
                    email: allMemberData[userIndex].email,
                    name: allMemberData[userIndex].name,
                })
                navigate("/workSpaceBanner", {
                    state: {
                        memberViewModel: memberViewModel,
                    }
                });
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
        setAllMemberData(memberViewModel.getAll());
        // getAllMemberData()
        // .then(
        //     (res) => {
        //         console.log(res)
        //         setAllMemberData(res)
        //     }
        // )
    },[])

    return(
        <div>
            <div className='top'></div>
            <div className="Auth-form-container">
                <img src="assets/images/leftCrab.png" width="150px"/>
                <div>
                    <div className="Logo-style">
                        <p className="Login-sentence">Enjoy Lobster!</p>
                    </div>
                    <div className="Auth-form">
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
                    <div className='tail'>
                        <img src="assets/images/tail.png" width="300px"/>
                    </div>
                </div>
                <img src="assets/images/rightCrab.png" width="140px"/>
            </div>
        </div>
    );
}

export default Login;