import React, { useState } from 'react';

import './Modal.css';
const DepartmentModifyModal=({departmentName,departmentGoal,departmentDeadLine,setdpModifyModalIsOpen})=>{
    let [inputDepartmentName, setInputDepartmentName] = useState(departmentName);
    let [inputDepartmentGoal, setInputDepartmentGoal] = useState(departmentGoal);
    let [inputDepartmentDeadLine, setInputDepartmentDeadLine] = useState(departmentDeadLine);
    


return(
    <div>
        <button className="modal-close" type="button" onClick={() => setdpModifyModalIsOpen(false)}>X</button>
        <h3 className="Auth-form-title">그룹 수정하기</h3>
        <div className="form-group mt-3">
            <label>그룹이름</label>
            <input
                type="text"
                className="form-control mt-1"
                placeholder="그룹 이름을 입력해주세요"
                value={ inputDepartmentName }
                onChange={e => setInputDepartmentName(e.target.value)}
            />
        </div>
        <div className="form-group mt-3">
            <label>목적</label>
            <input
                type="text"
                className="form-control mt-1"
                placeholder="목적을 입력해주세요"
                value={ inputDepartmentGoal }
                onChange={e => setInputDepartmentGoal(e.target.value)}
            />
        </div>
        <div className="form-group mt-3">
                <label>마감일</label>
                <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="마감일을 입력해주세요"
                    value={ inputDepartmentDeadLine }
                    onChange={e => setInputDepartmentDeadLine(e.target.value)}
                />
        </div>

        <div className="d-grid gap-2 mt-3">
                <button className="btn btn-secondary">
                    수정하기
                </button>
        </div>
    </div>
);
}
export default DepartmentModifyModal;