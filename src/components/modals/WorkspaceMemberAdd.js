import React, { useEffect, useState } from 'react';
import { WorkspaceMember } from '../../models/model/WorkspaceMember';
import { getMemberProfile } from '../../api/MemberAPI';
import './Modal.css'
import { inviteMemberToWorkspace } from '../../api/WorkspaceAPI';
import Stomp from 'stompjs';

const WorkspaceMemberAdd=({setWorkspaceMemberAddModalIsOpen,workspaceId,workspaceMembers,stomp})=>{
    let [inputMemberEmail,setinputMemberEmail]=useState("");
    let [searchedMemberHTML,setSearchedMemberHTML]=useState();
    let [memberList,setMemberList]=useState([]);
    let [memberNameList,setmMemberNameList]=useState([]);
    let [addedMemberHTML,setAddedMemberHTML]=useState();

    
    useEffect(()=>{
        let memberListHTML=[];
        for(var i=0;i<memberList.length;i++){
            let email=memberList.at(i)
            let name=memberNameList.at(i)
            // console.log(memberList.at(i));
            memberListHTML.push(<div key={email} className='searched-Email-div' onClick={()=>deleteMemberAtList(email)}>
                    <div>
                        <span style={{color:'black', fontSize : '14px', float:'left'}}>{name}&nbsp;({email})</span>
                        <span style={{color:'black', fontSize : '14px', float:'right'}}>X</span>
                    </div>
                </div>)
        }
        setAddedMemberHTML([...memberListHTML]);
    },[memberList])

    function addMemberToList(email,name){
        let isExistedInList=false;

        for(var i=0;i<memberList.length;i++){
            if(memberList.at(i)===email){
                isExistedInList=true
            }
            // console.log(memberList.length)
        }
        if(isExistedInList===false){
            setMemberList([...memberList,email]);
            setmMemberNameList([...memberNameList,name]);
            setSearchedMemberHTML(<span style={{color:'green', fontSize : '14px'}}>추가되었습니다.</span>)
        }
        else{   
            setSearchedMemberHTML(<span style={{color:'orange', fontSize : '14px'}}>이미 리스트에 추가되었습니다.</span>)
        }
    }

    function deleteMemberAtList(value){
        let key=value
        let index=memberList.indexOf(key)
        memberNameList.splice(index,1);
        memberList.splice(index,1);
        setmMemberNameList([...memberNameList])
        setMemberList([...memberList])
        // console.log(memberList)
    }

    function inviteMember(){
        if(memberList.length===0){
            alert("초대할 멤버가 없습니다.")
        }
        else{
            inviteMemberToWorkspace(memberList,memberNameList,workspaceId)
            .then( (res) => {
                if (res.status === 201){
                    // alert("초대가 완료되었습니다.")
                    stomp.send('/pub/chat/workspace/invitation', {}, ('ok'))
                    setWorkspaceMemberAddModalIsOpen(false)
                }
            });
        }
    }




    function searchMember(){
        let isExistedInWorkspase=false;
        for(var i=0;i<workspaceMembers.length;i++){
            if(workspaceMembers.at(i).email===inputMemberEmail){
                isExistedInWorkspase=true
            }
        }
        if(isExistedInWorkspase===true){
            setSearchedMemberHTML(<span style={{color:'orange', fontSize : '14px'}}>이미 현재 워크스페이스에 존재하는 유저입니다.</span>)
            return;
        }
        let result=Promise.resolve(getMemberProfile(inputMemberEmail))
            result.then(value=>{
                console.log(result)
                let data=value.at(0)
                let status=value.at(1)
                if(status==200){
                    console.log(data.email)
                    console.log(data.memberName)
                    setSearchedMemberHTML(
                        <div className='searched-Email-div' onClick={()=>addMemberToList(data.email,data.memberName)}>
                            <div>
                                <span style={{color:'black', fontSize : '14px', float:'left'}}>{data.memberName}&nbsp;({data.email})</span>
                                <span style={{color:'black', fontSize : '14px', float:'right'}}>+</span>
                            </div>
                        </div>)
                }
                else if(status===404){
                    setSearchedMemberHTML(<span style={{color:'red', fontSize : '14px'}}>존재하지 않는 유저의 이메일입니다.</span>)
                }
                else {
                    setSearchedMemberHTML(<span style={{color:'red', fontSize : '14px'}}>서버에 에러가 발생했습니다.</span>)
                }
            }).catch(error=>{
                setSearchedMemberHTML(<span style={{color:'red', fontSize : '14px'}}>서버에 에러가 발생했습니다.</span>)
            })
    }

return(
    <div>
        <button className="modal-close" type="button" onClick={() => setWorkspaceMemberAddModalIsOpen(false)}>X</button>
        <div className='modal-container'>
            <h3 >멤버 초대하기</h3>
            <div>
                <label>이메일 검색</label>
                <div>
                    <input
                        type="text"
                        placeholder="초대할 유저의 이메일을 입력해주세요"
                        value={ inputMemberEmail }
                        onChange={e => setinputMemberEmail(e.target.value)}
                        style={{float:'left', height:"38px"}}
                    />
                    <button className="btn btn-primary" style={{float:'right'}} onClick={()=>searchMember()}>검색</button>
                </div>
            </div>
            
            <div>
                {searchedMemberHTML}
            </div>

            <div className='added-member-container'>
                <label>멤버 리스트</label>
                {addedMemberHTML}
            </div>

            <button className="btn btn-primary" onClick={()=>inviteMember()}>
                초대하기
            </button>
        </div>
    </div>
);
}
export default WorkspaceMemberAdd;