import { ListGroup } from "react-bootstrap";
import MemberCard from "./MemberCard";

export default function MemberList(props){

    let memberCards = [];

    props.members.map( (member, index) => {
        memberCards.push(
            <MemberCard
                profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                name={member.memberName}
                email={member.email}
                role={member.departmentRole}
                onClicked={() => alert(member.memberName)}
                key = {index}
            />
        )
    })


    return (<ListGroup variant="flush"> {memberCards} </ListGroup>);
}
