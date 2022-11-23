import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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

const DepartmentAddModal = ({modalIsOpen, setModalIsOpen, workspaceMembers, loginMemberName, stomp}) => {

    let [inputDepartmentName, setInputDepartmentName] = useState("");
    let [inputDepartmentGoal, setInputDepartmentGoal] = useState("");
    let [inputDepartmentDeadLine, setInputDepartmentDeadLine] = useState("");
    let [inputDepartmentMemberData, setInputDepartmentMemberData] = useState([]);

    function applyWorkspaceMemberListInDropdown() {
        let htmlArrayForDepartmentMember = [];

        for (let index = 0; index < workspaceMembers.length; index++) {
            let memberName = workspaceMembers[index].memberName
            let memberEmail = workspaceMembers[index].email


            if (localStorage.getItem('loginMemberEmail') !== memberEmail){
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
                return;
            }
        }
        copiedMemberData.push(
            {
                email: memberEmail,
                memberName: memberName,
            }
        )
        setInputDepartmentMemberData(copiedMemberData)
    }
    
    function getSelectedMemberName() {
        let selectedMemberNameList = [];

        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            selectedMemberNameList.push(inputDepartmentMemberData[index].memberName)
        }

        return selectedMemberNameList;
    }

    function addDepartmentData() {
        // let selectedMemberLength = getSelectedMemberName().length;
        if (inputDepartmentDeadLine === "" || inputDepartmentGoal === "" || inputDepartmentName === ""){
            alert("모든정보를 입력해주세요")
            return
        }

        let departmentMemberList = [];

        departmentMemberList.push( // 생성자는 처음에 무조건 포함
            {
                email: localStorage.getItem('loginMemberEmail'),
                memberName: loginMemberName,
                role: '',
                grade: ''
            }
        )

        for (let index = 0; index < inputDepartmentMemberData.length; index++){
            departmentMemberList.push({
                email: inputDepartmentMemberData[index].email,
                memberName: inputDepartmentMemberData[index].memberName,
                role: '',
                grade: ''
            },)
        }

        let department = {
            departmentName: inputDepartmentName,
            departmentGoal: inputDepartmentGoal,
            departmentDeadline: String(inputDepartmentDeadLine),
            departmentId: "",
            workspaceId: localStorage.getItem('accessedWorkspaceId') 
        }

        stomp.send('/pub/chat/department/creation', {}, JSON.stringify({department,departmentMemberList}))
        
        setModalIsOpen(false);
    }

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

    return(
        <div className='departmentMember-add-modal-container'>
            <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
            <h3 className="Auth-form-title">그룹추가하기</h3>
            <div className="form-group mt-3">
                <label>그룹명</label>
                <input
                    type="text"
                    className="form-control bg-light"
                    placeholder="그룹명을 입력해주세요"
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
                    onkeydown="return false"
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
                <button className="btn btn-secondary" onClick={ () => addDepartmentData() }>
                    추가하기
                </button>
            </div>
        </div>
    );
}

export default DepartmentAddModal;