import * as React from 'react';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
let sockJS;
let stompClient;

export default function SocketTest() {

    const [contents, setContents] = React.useState('');
    const [message, setMessage] = React.useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        sockJS = new SockJS('주소');
        stompClient = Stomp.over(sockJS);
        stompClient.debug = null;
        stompClient.connect({},
            () => {
                stompClient.subscribe('/sub/room/' + "room_id", (data) => {
                    const newMessage = JSON.parse(data.body);
                    addMessage(newMessage);
                });
            },
            (err) => {
            });
        return function cleanup() {
            stompClient.disconnect();
        }
    }, []);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [contents]);

    const handleClick = (contents) => {
        var sender =
            localStorage.getItem('name') + ' (' + localStorage.getItem('email') + ')';
        const newMessage = {
            type: 'COMMENT',
            roomId: "room_id",
            sender,
            contents,
        };
        stompClient.send('/pub/chat', {}, JSON.stringify(newMessage)); // sender
        setMessage('');
    };

    const addMessage = (message) => {
        setContents((prev) => [...prev, message]); // contents state
    };

    return (
        <div className={'container'}>
            <span> {contents }</span>
            <div className="input-group">
                <input type="text" placeholder="Type a message" className="form-control py-3 bg-light" value={ message }
                    onChange={e => setMessage(e.target.value)}/>
                <button onClick={ () => handleClick }> send </button>
            </div>
            {/* <ChatRoomPresenter
                contents={contents}
                message={message}
                setMessage={setMessage}
                handleClick={handleClick}
                messagesRef={messagesRef}
            /> */}
        </div>
    );

}