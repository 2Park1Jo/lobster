import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './Modal.css';

const CustomMenu = React.forwardRef(
({ children, style, className, 'aria-labelledby': labeledBy, selectedMemberNameList }, ref) => {
    const [value, setValue] = useState('');
    
    return (
    <div>
        <div className='selected-member-container'>
            <span className='selected-member-container'>
                {selectedMemberNameList}
            </span>
            <input
                style={{backgroundColor:'gainsboro', border:'none', width:'90%', outline:'none'}}
                placeholder="멤버 검색"
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
        </div>

        <div ref={ref} className={className} aria-labelledby={labeledBy}>
            <ul className="list-unstyled" style={{width:'300px', height:'200px', overflowY:'auto'}}>
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

const DepartmentMemberAddModal = ({modalIsOpen, setModalIsOpen, accessedDepartmentId, departmentMembers, workspaceMembers, stomp}) => {
    let [inputDepartmentMemberData, setInputDepartmentMemberData] = useState([]);
    let [selectedMemberNameList, setSelectedMemberNameList] = useState([]);
    let workspaceMemberData = workspaceMembers;

    useEffect( () => {
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

        workspaceMemberData = workspaceMemberData.sort((a,b) => { // 이름순으로 정렬
            if(a.memberName > b.memberName) return 1;
            if(a.memberName < b.memberName) return -1;
            return 0;
        });

        for (let index = 0; index < workspaceMemberData.length; index++) {
            let memberName = workspaceMemberData[index].memberName
            let memberEmail = workspaceMemberData[index].email

            if (!isAlreadyJoinMember(memberEmail)){
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
        <div className='departmentMember-add-modal-container'>
            <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
            <h3 className="Auth-form-title">멤버추가</h3>
            <div className="form-group mt-3">
                <Dropdown show={true}>
                    <Dropdown.Menu as={CustomMenu} selectedMemberNameList={selectedMemberNameList}>
                        { applyWorkspaceMemberListInDropdown() }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div style={{height:'225px'}}>
                &nbsp;
            </div>

            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-secondary" onClick={ () => addDepartmentData() }>
                    추가하기
                </button>
            </div>
        </div>
    );
}

export default DepartmentMemberAddModal;