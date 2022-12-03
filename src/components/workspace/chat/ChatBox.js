import Message from "./Message";
import { ListGroup } from 'react-bootstrap'
import { useEffect, useState } from "react";

export default function ChatBox(props){

    let [chatContents, setChatContents] = useState([]);

    useEffect( () => {
        let chats = [];
        props.chats.map( (chat, index) => {
            chats.push(
                <Message
                    chatSender={ props.departmentMemberViewModel.getMemberName(chat.email) }
                    chatDate={chat.date}
                    chatContent={chat.content}
                    chatType={chat.contentType}
                    link={chat.link}
                    key = {index}
                />
            )
        })
        setChatContents([...chats])

    }, [props.chats.length])

    useEffect( () => {
        props.messageEnd.current?.scrollIntoView({behavior: "auto"})
    }, [chatContents])

    return (
        <div className="px-4 py-3">
            <ListGroup>
                { chatContents }
                <div ref={ props.messageEnd }></div>
            </ListGroup>
        </div>
    );
}
