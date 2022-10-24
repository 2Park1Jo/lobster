import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import './Modal.css';
import { getDepartmentMemberData, setDepartmentMemberData } from '../../data/DepartmentMemberData';
import { getWorkspaceMemberData } from '../../data/WorkspaceMemberData';

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

const DepartmentMemberAddModal = ({modalIsOpen, setModalIsOpen, accessedDepartmentId}) => {
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
        if (selectedMemberLength === 0){
            alert("추가할 멤버를 선택해주세요")
            return
        }

        let newDepartmentMemberData = getDepartmentMemberData();
        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            newDepartmentMemberData.push(
                {
                    departmentId: accessedDepartmentId,
                    email: inputDepartmentMemberData[index].email,
                    name: inputDepartmentMemberData[index].name,
                    role: '',
                    grade: ''
                },
            )
        }
        setDepartmentMemberData(newDepartmentMemberData);
        setModalIsOpen(false);
    }

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
            <h3 className="Auth-form-title">멤버추가</h3>
            <div className="form-group mt-3">
                <label>멤버추가</label>
                <input
                    type="text"
                    className="form-control mt-1"
                    disabled="disabled"
                    placeholder="멤버를 추가해주세요"
                    value={ getSelectedMemberName() }
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

export default DepartmentMemberAddModal;