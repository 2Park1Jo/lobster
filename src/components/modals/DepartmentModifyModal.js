import React, { useState } from 'react';
import './Modal.css';

const DepartmentModifyModal=({departmentName,departmentGoal,departmentDeadLine,setdpModifyModalIsOpen, stomp})=>{
    let [inputDepartmentName, setInputDepartmentName] = useState(departmentName);
    let [inputDepartmentGoal, setInputDepartmentGoal] = useState(departmentGoal);
    let [inputDepartmentDeadLine, setInputDepartmentDeadLine] = useState(departmentDeadLine.replace("마감일 : ",""));
    
    function setName(e){
        if(e.target.value.length<50){
            setInputDepartmentName(e.target.value)
        }
        else{
            alert("50글자 이하로 입력해주세요!")
        }
    }

    function setGoal(e){
        if(e.target.value.length<50){
            setInputDepartmentGoal(e.target.value)
        }
        else{
            alert("50글자 이하로 입력해주세요!")
        }
    }

    function modifyDepartment(){

        if (inputDepartmentName === departmentName && inputDepartmentGoal === departmentGoal && inputDepartmentDeadLine === departmentDeadLine){
            alert("변동내역이 없습니다.")
        }
        else{
            let department = {
                departmentName: inputDepartmentName,
                departmentGoal: inputDepartmentGoal,
                departmentDeadline: inputDepartmentDeadLine,
                departmentId: localStorage.getItem('accessedDepartmentId'),
                workspaceId: localStorage.getItem('accessedWorkspaceId') 
            }
    
            stomp.send('/pub/chat/department/update', {}, JSON.stringify(department))
            alert("수정이 완료되었습니다.")
            setdpModifyModalIsOpen(false)
        }
    }

return(
    <div className='departmentMember-add-modal-container'>
        <button className="modal-close" type="button" onClick={() => setdpModifyModalIsOpen(false)}>X</button>
        <h3 className="Auth-form-title">그룹 수정하기</h3>
        <div className="form-group mt-3">
            <label>그룹이름</label>
            <input
                type="text"
                className="form-control bg-light"
                placeholder="그룹 이름을 입력해주세요"
                value={ inputDepartmentName }
                onChange={e => setName(e)}
            />
        </div>
        <div className="form-group mt-3">
            <label>목적</label>
            <input
                type="text"
                className="form-control bg-light"
                placeholder="목적을 입력해주세요"
                value={ inputDepartmentGoal }
                onChange={e => setGoal(e)}
            />
        </div>
        <div className="form-group mt-3">
            <label>마감일</label>
            <input
                type="date"
                className="form-control bg-light"
                placeholder="마감일을 입력해주세요"
                value={ inputDepartmentDeadLine }
                onChange={e => setInputDepartmentDeadLine(e.target.value)}
            />
        </div>

        <div className="d-grid gap-2 mt-3" onClick={() => modifyDepartment()}>
            <button className="btn btn-secondary">
                수정하기
            </button>
        </div>
    </div>
);
}
export default DepartmentModifyModal;