import { getActiveElement } from '@testing-library/user-event/dist/utils/index.js';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BACK_BASE_URL } from "../Config.js";

let sockJs = new SockJS("http://ec2-54-180-99-127.ap-northeast-2.compute.amazonaws.com:8080/chat");
let stomp = Stomp.over(sockJs);

export default function SocketTest() {

    const [contents, setContents] = React.useState('');
    const [input, setInput] = React.useState('');
    const [message, setMessage] = React.useState('');
    const messagesRef = useRef(null);

    let departmentName = "아이디어";
    let departmentId = "department12345";
    let email = "test1@naver.com";


    stomp.connect({}, onConnected, () => {
        console.log('Broker reported error');
    });

    function onConnected() {
        //메세지 수신시 "/sub/chat/department/{departmentId}"주소로 수신됨
        stomp.subscribe("/sub/chat/department/" + departmentId, function (chat) {
        var result = JSON.parse(chat.body);
        console.log(result)
        // var user = result.email;
        // var str = [...contents];
        // str.push("<" + result.content + ">")
        // setContents(str);
    });

    stomp.send('/pub/chat/enter', {}, JSON.stringify({departmentId: departmentId, email: email}))
    }


    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);
    }


    // useEffect(() => {
    //     sockJS = new SockJS(BACK_BASE_URL + "chat");
    //     stompClient = Stomp.over(sockJS);
    //     stompClient.debug = null;
    //     stompClient.connect({},
    //         () => {
    //             stompClient.subscribe('/sub/chat/department/' + departmentId, (data) => {
    //                 const newMessage = JSON.parse(data.body);
    //                 console.log(newMessage)
    //                 addMessage(newMessage);
    //             });
    //         },
    //         (err) => {
    //             console.log(err)
    //         });
    //     return function cleanup() {
    //         stompClient.disconnect();
    //     }
    // }, []);

    const handleClick = () => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let date = currentDate.getDate();
        let houres = String(currentDate.getHours()).padStart(2, "0");
        let minutes = String(currentDate.getMinutes()).padStart(2, "0");
        let seconds = String(currentDate.getSeconds()).padStart(2, "0");
        let currentTime = year + '-' + month + '-' + date + ' ' + houres + ':' + minutes + ':' + seconds;

        console.log(currentTime)
        stomp.send('/pub/chat/message', {}, JSON.stringify({
            departmentId: departmentId,
            email: email,
            content: input,
            contentType: 0,
            date : currentTime
        }))
        setInput('');
    };

    // console.log(new Date().getTime())

    return (
        <div className="container">
            <div className="col-6">
                <h1>투박한조</h1>
            </div>
            <div>
                <div id="msgArea" className="col"></div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="input"
                            value={ input }
                            onChange={e => setInput(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-send" onClick={() => handleClick()}>전송</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6">{contents}</div>
        </div>
    );

}