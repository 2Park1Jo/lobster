import MemberCard from "./MemberCard";

export default function MemberList(props){

    let memberCards = [];

    props.members.map( (member, index) => {
        memberCards.push(
            <MemberCard
                profilePicture='https://therichpost.com/wp-content/uploads/2020/06/avatar2.png'
                name={member.name}
                role={member.role}
                onClicked={() => alert(member.name)}
                key = {index}
            />
        )
    })

    return memberCards;
}
