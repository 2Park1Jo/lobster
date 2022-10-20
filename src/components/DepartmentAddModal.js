import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import './Modal.css';
import { getDepartmentData, setDepartmentData } from '../data/DepartmentData';
import { getDepartmentMemberData, setDepartmentMemberData } from '../data/DepartmentMemberData';
import { getWorkspaceMemberData, setWorkspaceMemberData } from '../data/WorkspaceMemberData';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
<a
    href=""
    ref={ref}
    onClick={(e) => {
    e.preventDefault();
    onClick(e);
    }}
>
    {children}
    &#x25bc;
</a>
));

const CustomMenu = React.forwardRef(
({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
    <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
    >
        <Form.Control
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="멤버 검색"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        />
        <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
            (child) =>
            !value || child.props.children.toLowerCase().startsWith(value),
        )}
        </ul>
    </div>
    );
},
);

const DepartmentAddModal = ({modalIsOpen, setModalIsOpen}) => {

    let [inputDepartmentName, setInputDepartmentName] = useState("");
    let [inputDepartmentGoal, setInputDepartmentGoal] = useState("");
    let [inputDepartmentDeadLine, setInputDepartmentDeadLine] = useState("");
    let [inputDepartmentMemberData, setInputDepartmentMemberData] = useState([]);
    let workspaceMemberData = getWorkspaceMemberData();

    function applyWorkspaceMemberListInDropdown() {
        let htmlArrayForDepartmentMember = [];

        for (let index = 0; index < workspaceMemberData.length; index++) {
            let memberName = workspaceMemberData[index].name
            let memberEmail = workspaceMemberData[index].email

            htmlArrayForDepartmentMember.push(
                <Dropdown.Item eventKey={ memberEmail } onClick={ () => addMemberData(memberName, memberEmail) }>{ memberName }</Dropdown.Item>
                )
        }
        return htmlArrayForDepartmentMember
    }

    function addMemberData(memberName, memberEmail) {
        let copiedMemberData = [...inputDepartmentMemberData];

        for (let index = 0; index < copiedMemberData.length; index++){
            if (copiedMemberData[index].email === memberEmail && copiedMemberData[index].name === memberName){
                return;
            }
        }
        copiedMemberData.push(
            {
                email: memberEmail,
                name: memberName,
            }
        )
        setInputDepartmentMemberData(copiedMemberData)
    }
    
    function getSelectedMemberName() {
        let selectedMemberNameList = [];

        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            selectedMemberNameList.push(inputDepartmentMemberData[index].name)
        }

        return selectedMemberNameList;
    }

    function addDepartmentData() {
        let selectedMemberLength = getSelectedMemberName().length;
        if (inputDepartmentDeadLine === "" || inputDepartmentGoal === "" || inputDepartmentName === "" || selectedMemberLength === 0){
            alert("모든정보를 입력해주세요")
            return
        }

        let randomDepartmentId = String(Math.random());

        let newDepartmentData = getDepartmentData();
        newDepartmentData.push(
            {
                departmentId:  randomDepartmentId,
                departmentName: inputDepartmentName,
                departmentGoal: inputDepartmentGoal,
                departmentDeadLine: String(inputDepartmentDeadLine)
            },
        )

        let newDepartmentMemberData = getDepartmentMemberData();
        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            newDepartmentMemberData.push(
                {
                    departmentId: randomDepartmentId,
                    email: inputDepartmentMemberData[index].email,
                    name: inputDepartmentMemberData[index].name,
                    role: '',
                    grade: ''
                },
            )
        }

        setDepartmentData(newDepartmentData);
        setDepartmentMemberData(newDepartmentMemberData);
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
            
            <div className="form-group mt-3">
                <label>멤버추가</label>
                <input
                    type="text"
                    className="form-control mt-1"
                    disabled="disabled"
                    placeholder="멤버를 추가해주세요"
                    value={ getSelectedMemberName() }
                    // onChange={e => set(e.target.value)}
                />
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        { applyWorkspaceMemberListInDropdown() }
                    </Dropdown.Menu>
                </Dropdown>
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