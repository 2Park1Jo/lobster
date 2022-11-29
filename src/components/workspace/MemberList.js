import { ListGroup } from "react-bootstrap";
import MemberCard from "./MemberCard";

export default function MemberList(props){

    let memberCards = [];
    let members = [];

    props.members.map((member) => {
        let isConnected = false;

        if(props.connectedMemberList !== undefined){
            for (let index = 0; index < props.connectedMemberList.length; index++){
                if (props.connectedMemberList.includes(member.email)){
                    isConnected = true;
                    break;
                }
            }
        }

        members.push(
            {
                email: member.email,
                memberName: member.memberName,
                workspaceId: member.workspaceId,
                departmentId: member.departmentId,
                isConnected: isConnected
            }
        )
    })

    members = members.sort((a,b) => { // 이름순으로 정렬  
        if(a.memberName > b.memberName) return 1;
        if(a.memberName < b.memberName) return -1;
    });

    members = members.sort((a,b) => b.isConnected - a.isConnected);

    members = members.sort((a,b) => { // 본인은 맨 앞으로
        if(a.email === localStorage.getItem('loginMemberEmail')) return -1;
    });

    if (members !== undefined){
        members.map( (member, index) => {
            memberCards.push(
                <MemberCard
                    profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                    name={member.memberName}
                    email={member.email}
                    role={member.departmentRole}
                    // onClicked={() => alert(member.memberName)}
                    isConnected={member.isConnected}
                    key = {index}
                />
            )
        })
    }

    return (<ListGroup variant="flush"> {memberCards} </ListGroup>);
}
