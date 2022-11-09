import Message from "./Message";
import ChatInputBox from "./ChatInputBox";
import { ListGroup } from 'react-bootstrap'
import { useEffect, useRef } from "react";

export default function ChatBox(props){
    let chats = [];
    // const messageEndRef = useRef(null); // 채팅메세지의 마지막

    props.chats.map( (chat, index) => {
        chats.push(
            <Message
                chatSender={ props.departmentMemberViewModel.getMemberName(chat.memberEmail) }
                chatDate={chat.date}
                chatContent={chat.content}
                key = {index}
            />
        )
    })

    useEffect( () => {
        props.messageEnd.current?.scrollIntoView({behavior: "auto"})
    }, [props.departmentId])

    return (
        <div className="px-4 py-3 bg-white">
            <ListGroup>
                { chats }
                <div ref={ props.messageEnd }></div>
            </ListGroup>
        </div>
    );
}
