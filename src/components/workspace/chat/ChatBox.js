import Message from "./Message";
import ChatInputBox from "./ChatInputBox";
import { ListGroup } from 'react-bootstrap'
import { useEffect, useRef } from "react";

export default function ChatBox(props){
    let chats = [];
    
    props.chats.map( (chat, index) => {
        chats.push(
            <Message
                chatSender={ props.departmentMemberViewModel.getMemberName(props.loginMemberEmail) }
                chatDate={chat.date}
                chatContent={chat.content}
                key = {index}s
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
