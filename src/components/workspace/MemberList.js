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
        return 0;
    });

    members = members.filter((member) => member.email === localStorage.getItem('loginMemberEmail')) // 연결되어있는 유저를 앞으로 이동 및 로그인한 유저는 맨앞으로 위치
                .concat(members.filter((member) => member.email !== localStorage.getItem('loginMemberEmail') && member.isConnected === true))
                .concat(members.filter((member) => member.isConnected !== true));

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
