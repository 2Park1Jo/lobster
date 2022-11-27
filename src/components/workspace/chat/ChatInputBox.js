import React from 'react'
import { useState, useEffect } from 'react';
import { BiPaperPlane } from "react-icons/bi";
import './ChatInputBox.css';

export default function ChatInputBox(props){
    let [inputChattingContent, setInputChattingContent] = useState(""); // 사용자가 입력한 채팅 컨텐츠 데이터

    function scrollToBottom(behavior) {
        props.messageEnd.current?.scrollIntoView({behavior: behavior})
    }

    useEffect( () => {
        scrollToBottom("auto");
    }, [props.chatUpdateState])

    useEffect( () => {
        if(inputChattingContent === '\n'){
            setInputChattingContent("");
        }
    },[inputChattingContent])    

    function addChattingData(chatContent) {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
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
        <div className='chat-input-box-container'>
            <textarea 
                className='chat-input-box'
                placeholder="Type a message" 
                value={ inputChattingContent }
                onChange={e => setInputChattingContent(e.target.value)} 
                onKeyPress={handleOnKeyPress}
            />
            <button className="send-button" onClick={ () => addChattingData(inputChattingContent) }> 
                {<BiPaperPlane/>} 
            </button>
        </div>
    )
}
