import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './Modal.css';
import { BiChevronsDown,BiChevronsUp } from "react-icons/bi";

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
// <a
//     href=""
//     ref={ref}
//     onClick={(e) => {
//     e.preventDefault();
//     onClick(e);
//     }}
// >
//     {children}
//     &#x25bc;
// </a>
// ));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy, selectedMemberNameList, memberListShowState }, ref) => {
        const [value, setValue] = useState('');
        
        return (
        <div>
            <div ref={ref} className={className} aria-labelledby={labeledBy} style={{border:'1px solid #717171'}}>
                <div className='selected-member-container'>
                    <input
                        style={{backgroundColor:'gainsboro', border:'none', width:'90%', outline:'none'}}
                        placeholder="멤버 검색"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                </div>
                <ul className="list-unstyled" style={{width:'300px', height:'160px', overflowY:'auto'}}>
                    {
                    React.Children.toArray(children).filter(
                        (child) =>
                        !value || child.props.children.includes(value),
                    )}
                </ul>
            </div>
        </div>
        );
    },
    );

const DepartmentAddModal = ({modalIsOpen, setModalIsOpen, workspaceMembers, loginMemberName, departmentMembers, stomp}) => {

    let [inputDepartmentName, setInputDepartmentName] = useState("");
    let [inputDepartmentGoal, setInputDepartmentGoal] = useState("");
    let [inputDepartmentDeadLine, setInputDepartmentDeadLine] = useState("");
    let [inputDepartmentMemberData, setInputDepartmentMemberData] = useState([]);
    let [selectedMemberNameList, setSelectedMemberNameList] = useState([]);
    let [memberListShowState, setMemberListShowState] = useState(false);

    useEffect( () => {
        setSelectedMemberName()
    }, [inputDepartmentMemberData])

    function isSelectedMember(memberEmail){
        for (let index = 0; index < selectedMemberNameList.length; index++){
            if (memberEmail === selectedMemberNameList[index].key){
                return true
            }
        }
        return false
    }

    function applyWorkspaceMemberListInDropdown() {
        let htmlArrayForDepartmentMember = [];
        workspaceMembers = workspaceMembers.sort((a,b) => { // 이름순으로 정렬
            if(a.memberName > b.memberName) return 1;
            if(a.memberName < b.memberName) return -1;
            return 0;
        });

        for (let index = 0; index < workspaceMembers.length; index++) {
            let memberName = workspaceMembers[index].memberName
            let memberEmail = workspaceMembers[index].email

            if (localStorage.getItem('loginMemberEmail') !== memberEmail){
                if (isSelectedMember(memberEmail)){
                    htmlArrayForDepartmentMember.push(
                        <Dropdown.Item style={{backgroundColor:'rgb(156, 156, 156)'}} className='dropdown-member-div' key={ memberEmail } eventKey={ memberEmail } onClick={ () => addMemberData(memberName, memberEmail) }>{ memberName + " (" + memberEmail + ")"}</Dropdown.Item>
                    )
                }
                else{
                    htmlArrayForDepartmentMember.push(
                        <Dropdown.Item className='dropdown-member-div' key={ memberEmail } eventKey={ memberEmail } onClick={ () => addMemberData(memberName, memberEmail) }>{ memberName + " (" + memberEmail + ")"}</Dropdown.Item>
                    )
                }
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
                    <span style={{color:'black', fontSize : '15px', marginLeft:'5px'}}>{memberName}</span>
                    <span style={{color:'black', fontSize : '12px', marginLeft:'5px', marginRight:'5px'}}>X</span>
                </span>
            )
        }

        setSelectedMemberNameList(memberNameList);
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
                <Dropdown show={memberListShowState}>
                    <Dropdown.Menu as={CustomMenu} selectedMemberNameList={selectedMemberNameList} memberListShowState={memberListShowState}>
                        { applyWorkspaceMemberListInDropdown() }
                    </Dropdown.Menu>
                </Dropdown>
                <div className="form-group mt-3">
                    <label>그룹명</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="그룹명을 입력해주세요"
                        value={ inputDepartmentName }
                        onChange={e => setName(e)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>목적</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="목적을 입력해주세요"
                        value={ inputDepartmentGoal }
                        onChange={e => setGoal(e)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>마감일</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="마감일을 입력해주세요"
                        value={ inputDepartmentDeadLine }
                        onChange={e => setInputDepartmentDeadLine(e.target.value)}
                        // onKeyDown="return false"
                    />
                </div>
                <div className="form-group mt-3">
                    <label>멤버추가</label>

                    <div style={{display:'inline-block'}} onClick={()=>setMemberListShowState(!memberListShowState)}>
                        {
                            memberListShowState === true ?
                            <BiChevronsDown className='memberShowArrow'/>
                            :
                            <BiChevronsUp className='memberShowArrow'/>
                        }
                    </div>
                    <div className='selected-member-container'>
                        <span className='selected-member-container'>
                            {selectedMemberNameList}
                        </span>
                    </div>
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