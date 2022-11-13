import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { BiPaperPlane } from "react-icons/bi";

export default function ChatInputBox(props){
    let [inputChattingContent, setInputChattingContent] = useState(""); // 사용자가 입력한 채팅 컨텐츠 데이터

    function scrollToBottom(behavior) {
        props.messageEnd.current?.scrollIntoView({behavior: behavior})
    }

    useEffect( () => {
        scrollToBottom("smooth");
    }, [props.chatUpdateState])

    function addChattingData(chatContent) {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let date = currentDate.getDate();
        let houres = String(currentDate.getHours()).padStart(2, "0");
        let minutes = String(currentDate.getMinutes()).padStart(2, "0");
        let seconds = String(currentDate.getSeconds()).padStart(2, "0");
        let currentTime = year + '-' + month + '-' + date + ' ' + houres + ':' + minutes + ':' + seconds;

        if (chatContent.replace(/ /g,"") === ""){
            setInputChattingContent("");
            return;
        }

        props.stomp.send('/pub/chat/message', {}, JSON.stringify({
            departmentId: props.departmentId,
            email: localStorage.getItem('loginMemberEmail'),
            content: inputChattingContent,
            contentType: 0,
            date : currentTime
        }))
        
        setInputChattingContent("");
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            addChattingData(inputChattingContent); // Enter 입력이 되면 클릭 이벤트 실행
            setInputChattingContent("");
        }
    };

    return(
        <div className="input-group px-1">
            <input type="text" placeholder="Type a message" className="form-control py-3 bg-light" value={ inputChattingContent }
                onChange={e => setInputChattingContent(e.target.value)} onKeyPress={handleOnKeyPress}/>
            <Button variant="secondary" onClick={ () => addChattingData(inputChattingContent) }> {<BiPaperPlane style={{fontSize:'20px'}}/>} </Button>
        </div>
    )
}
