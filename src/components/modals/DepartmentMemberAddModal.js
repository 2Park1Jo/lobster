import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ListGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import './Modal.css';

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

const DepartmentMemberAddModal = ({modalIsOpen, setModalIsOpen, accessedDepartmentId, departmentMembers, workspaceMembers, stomp}) => {
    let [inputDepartmentMemberData, setInputDepartmentMemberData] = useState([]);
    let [selectedMemberNameList, setSelectedMemberNameList] = useState([]);
    let workspaceMemberData = workspaceMembers;

    useEffect( () => {
        console.log(inputDepartmentMemberData)
        setSelectedMemberName()
    }, [inputDepartmentMemberData])

    function isAlreadyJoinMember(memberEmail){
        for (let index = 0; index < departmentMembers.length; index++) {
            if (memberEmail === departmentMembers[index].email){
                return true
            }
        }
        return false
    }

    function applyWorkspaceMemberListInDropdown() {
        let htmlArrayForDepartmentMember = [];

        for (let index = 0; index < workspaceMemberData.length; index++) {
            let memberName = workspaceMemberData[index].memberName
            let memberEmail = workspaceMemberData[index].email

            if (!isAlreadyJoinMember(memberEmail)){
                htmlArrayForDepartmentMember.push(
                    <Dropdown.Item key={ memberEmail } eventKey={ memberEmail } onClick={ () => addMemberData(memberName, memberEmail) }>{ memberName }</Dropdown.Item>
                )
            }
        }
        return htmlArrayForDepartmentMember
    }

    function addMemberData(memberName, memberEmail) {
        let copiedMemberData = [...inputDepartmentMemberData];

        for (let index = 0; index < copiedMemberData.length; index++){
            if (copiedMemberData[index].email === memberEmail && copiedMemberData[index].memberName === memberName){
                deleteMemberInList(memberEmail)
                return;
            }
        }
        copiedMemberData.push(
            {
                key : memberEmail,
                email: memberEmail,
                memberName: memberName,
            }
        )
        setInputDepartmentMemberData(copiedMemberData)

    }

    function deleteMemberInList(memberEmail){
        let index = selectedMemberNameList.findIndex((e) => e.key === memberEmail)

        inputDepartmentMemberData.splice(index,1)
        selectedMemberNameList.splice(index,1)

        setInputDepartmentMemberData([...inputDepartmentMemberData])
        setSelectedMemberNameList([...selectedMemberNameList])
    }
    
    function setSelectedMemberName() {
        let memberNameList = [];

        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            let email = inputDepartmentMemberData[index].email
            let memberName = inputDepartmentMemberData[index].memberName

            memberNameList.push(
                <span key={email} className='selected-member-div' onClick={() => deleteMemberInList(email)}>
                    <span style={{color:'black', fontSize : '16px'}}>{memberName}</span>
                    <span style={{color:'black', fontSize : '10px'}}>X</span>
                </span>
            )
        }

        setSelectedMemberNameList(memberNameList);
    }

    function addDepartmentData() {
        let selectedMemberLength = selectedMemberNameList.length;
        if (selectedMemberLength === 0){
            alert("추가할 멤버를 선택해주세요")
            return
        }

        let departmentMemberList = [];

        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            departmentMemberList.push({
                departmentId: accessedDepartmentId,
                email: inputDepartmentMemberData[index].email,
                memberName: inputDepartmentMemberData[index].memberName,
                role: '',
                grade: ''
            },)
        }

        stomp.send('/pub/chat/invitation', {}, JSON.stringify(departmentMemberList))

        setModalIsOpen(false);
    }

    return(
        <div style={{width:'300px', height:'300px'}}>
            <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
            <h3 className="Auth-form-title">멤버추가</h3>
            <div className="form-group mt-3">
                <div className='selected-member-container'>
                    {selectedMemberNameList}
                </div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                        { applyWorkspaceMemberListInDropdown() }
                    </Dropdown.Menu>
                    &nbsp;멤버추가
                </Dropdown>
            </div>

            <div className="d-grid gap-2 mt-3" style={{position: 'absolute', width:'90%', left: '5%', bottom: '10px'}}>
                <button className="btn btn-primary" onClick={ () => addDepartmentData() }>
                    추가하기
                </button>
            </div>
        </div>
    );
}

export default DepartmentMemberAddModal;