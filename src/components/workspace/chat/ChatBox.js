import Message from "./Message";
import ChatInputBox from "./ChatInputBox";
import { ListGroup } from 'react-bootstrap'

export default function ChatBox(props){
    let chats = [];

    props.chats.map( (chat, index) => {
        chats.push(
            <Message
                chatSender={ props.departmentMemberViewModel.getMemberName(chat.memberEmail) } // 이름으로 바꿔야함
                chatDate={chat.date}
                chatContent={chat.content}
                key = {index}
            />
        )
    })

    return (
        <>
            <div className="px-4 py-3 chat-box bg-white">
                <ListGroup>
                    { chats }
                    <div ref={ props.messageEnd }></div>
                </ListGroup>
            </div>
            <ChatInputBox 
                chatViewModel = {props.chatViewModel}
                departmentId = {props.departmentId}
                memberEmail = {props.loginMemberEmail}
            />
        </>
    );
}
