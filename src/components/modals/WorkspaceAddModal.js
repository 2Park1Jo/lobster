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

const WorkspaceAddModal = ({modalIsOpen, setModalIsOpen, allMemberViewModel, stomp}) => {

    let [inputWorkspaceName, setInputWorkspaceName] = useState("");
    let [inputWorkspaceGoal, setInputWorkspaceGoal] = useState("");
    let [inputWorkspaceDeadLine, setInputWorkspaceDeadLine] = useState("");
    let [inputWorkspaceMemberData, setInputWorkspaceMemberData] = useState([]);
    let allMemberData = allMemberViewModel.getAll();
    
    function applyWorkspaceMemberListInDropdown() {
        let htmlArrayForWorkspaceMember = [];

        for (let index = 0; index < allMemberData.length; index++) {
            let memberName = allMemberData[index].memberName
            let memberEmail = allMemberData[index].email

            htmlArrayForWorkspaceMember.push(
                <Dropdown.Item key={ memberEmail } eventKey={ memberEmail } onClick={ () => addMemberData(memberName, memberEmail) }>{ memberName }</Dropdown.Item>
                )
        }
        return htmlArrayForWorkspaceMember
    }

    function addMemberData(memberName, memberEmail) {
        let copiedMemberData = [...inputWorkspaceMemberData];

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
        setInputWorkspaceMemberData(copiedMemberData)
    }
    
    function getSelectedMemberName() {
        let selectedMemberNameList = [];

        for (let index = 0; index < inputWorkspaceMemberData.length; index++){
            selectedMemberNameList.push(inputWorkspaceMemberData[index].memberName)
        }

        return selectedMemberNameList;
    }

    function addWorkspaceData() {
        let selectedMemberLength = getSelectedMemberName().length;
        if (inputWorkspaceDeadLine === "" || inputWorkspaceGoal === "" || inputWorkspaceName === "" || selectedMemberLength === 0){
            alert("모든정보를 입력해주세요")
            return
        }

        let randomWorkspaceId = String(Math.random());

        stomp.send('workspace추가 주소', {}, JSON.stringify({
            WorkspaceId:  randomWorkspaceId,
            WorkspaceName: inputWorkspaceName,
            WorkspaceGoal: inputWorkspaceGoal,
            WorkspaceDeadLine: String(inputWorkspaceDeadLine)
        }))

        let workspaceMemberList = [];
        for (let index = 0; index < inputWorkspaceMemberData.length; index++){
            workspaceMemberList.push({
                workspaceId: randomWorkspaceId,
                email: inputWorkspaceMemberData[index].email,
                memberName: inputWorkspaceMemberData[index].memberName,
                role: '',
                grade: ''
            },
            )
            // stomp.send('workspaceMember추가 주소', {}, JSON.stringify({
            //     workspaceId: randomWorkspaceId,
            //     email: inputWorkspaceMemberData[index].email,
            //     memberName: inputWorkspaceMemberData[index].memberName,
            //     role: '',
            //     grade: ''
            // }))
        }

        stomp.send('workspaceMember추가 주소', {}, JSON.stringify({workspaceMemberList}))

        setModalIsOpen(false);
    }

    return(
        <div>
            <button className="modal-close" type="button" onClick={() => setModalIsOpen(false)}>X</button>
            <h3 className="Auth-form-title">워크스페이스 추가하기</h3>
            <div className="form-group mt-3">
                <label>워크스페이스이름</label>
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="워크스페이스 이름을 입력해주세요"
                    value={ inputWorkspaceName }
                    onChange={e => setInputWorkspaceName(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label>목적</label>
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="목적을 입력해주세요"
                    value={ inputWorkspaceGoal }
                    onChange={e => setInputWorkspaceGoal(e.target.value)}
                />
            </div>
            <div className="form-group mt-3">
                <label>마감일</label>
                <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="마감일을 입력해주세요"
                    value={ inputWorkspaceDeadLine }
                    onChange={e => setInputWorkspaceDeadLine(e.target.value)}
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
                <button className="btn btn-primary" onClick={ () => addWorkspaceData() }>
                    추가하기
                </button>
            </div>
        </div>
    );
}

export default WorkspaceAddModal;