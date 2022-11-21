import Message from "./Message";
import { ListGroup } from 'react-bootstrap'
import { useEffect, useMemo } from "react";

export default function ChatBox(props){
    let chats = useMemo( () => {
        let chatList = [];
        props.chats.map( (chat, index) => {
            chatList.push(
                <Message
                    chatSender={ props.departmentMemberViewModel.getMemberName(chat.email) }
                    chatDate={chat.date}
                    chatContent={chat.content}
                    chatType={chat.contentType}
                    link={chat.link}
                    key = {index}s
                />
            )
        })
        return chatList;
        }
    ,[props.chats.length]);

    useEffect( () => {
        props.messageEnd.current?.scrollIntoView({behavior: "auto"})
    }, [props.departmentId])

    return (
        <div className="px-4 py-3">
            <ListGroup>
                { chats }
                <div ref={ props.messageEnd }></div>
            </ListGroup>
        </div>
    );
}
