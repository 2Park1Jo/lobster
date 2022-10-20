import './Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getMemberData } from '../data/MemberData.js';
import { getAllMemberData } from '../api/MemberAPI';

const Login = function () {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [allMemberData, setAllMemberData] = useState([]);
    let navigate = useNavigate();

    function checkLoginSuccess() {
        for (let userIndex = 0; userIndex < allMemberData.length; userIndex++) {
            if (email == allMemberData[userIndex].email && password === allMemberData[userIndex].password){
                navigate("/workSpace", { state:
                    {   
                        loginUserEmail : allMemberData[userIndex].email,
                        loginUserName: allMemberData[userIndex].name
                    } 
                })
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
        getAllMemberData()
        .then(
            (res) => {
                setAllMemberData(res)
            }
        )
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
                    <div className="d-grid gap-2 mt-3">
                
                    <button type="submit" className="btn btn-primary" onClick={ checkLoginSuccess }>
                        로그인
                    </button>
                
                    </div>
                    <p className="forgot-password text-right mt-2">
                        <a href="#">비밀번호를 잊어버리셨습니까?</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;