import React, { useState } from 'react';
import './Modal.css';
import { getDepartmentData, setDepartmentData } from '../data/DepartmentData';

const DepartmentAddModal = ({modalIsOpen, setModalIsOpen}) => {

    let [inputDepartmentName, setDepartmentName] = useState("");
    let [inputDepartmentGoal, setDepartmentGoal] = useState("");
    let [inputDepartmentDeadLine, setDepartmentDeadLine] = useState("");

    function addDepartmentData() {
        if (inputDepartmentDeadLine === "" || inputDepartmentGoal === "" || inputDepartmentName === ""){
            alert("모든정보를 입력해주세요")
            return
        }

        let departmentData = getDepartmentData();
        departmentData.push(
            {
                departmentId: 'setUniqueIdLater',
                departmentName: inputDepartmentName,
                departmentGoal: inputDepartmentGoal,
                departmentDeadLine: String(inputDepartmentDeadLine)
            },
        )

        setDepartmentData(departmentData);
        setModalIsOpen(false);
    }

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
            <h3 className="Auth-form-title">그룹추가하기</h3>
            <div className="form-group mt-3">
                <label>그룹명</label>
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="그룹명을 입력해주세요"
                    value={ inputDepartmentName }
                    onChange={e => setDepartmentName(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label>목적</label>
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="목적을 입력해주세요"
                    value={ inputDepartmentGoal }
                    onChange={e => setDepartmentGoal(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label>마감일</label>
                <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="마감일을 입력해주세요"
                    value={ inputDepartmentDeadLine }
                    onChange={e => setDepartmentDeadLine(e.target.value)}
                />
            </div>

            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary" onClick={ () => addDepartmentData() }>
                    추가하기
                </button>
            </div>
        </div>
    );
}

export default DepartmentAddModal;