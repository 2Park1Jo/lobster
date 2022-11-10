import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';


export default function ChatInputBox(props){

    let [inputChattingContent, setInputChattingContent] = useState(""); // 사용자가 입력한 채팅 컨텐츠 데이터

    function scrollToBottom(behavior) {
        props.messageEnd.current?.scrollIntoView({behavior: behavior})
    }

    useEffect( () => {
        scrollToBottom("smooth");
    }, [props.chatUpdateState])

    function addChattingData(chatContent) {
        let copiedChattingData = [...props.chatViewModel.getAll()];
        let date = new Date();
        let houres = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let currentTime = houres + ':' + minutes;

        if (chatContent.replace(/ /g,"") === ""){
            setInputChattingContent("");
            return;
        }
        
        copiedChattingData.push({
            workspaceId: "1",
            departmentId: props.departmentId, 
            memberEmail: props.loginMemberEmail,
            content: chatContent,
            date: currentTime,
            content_type: "TEXT",
            link: "",
        })

        props.chatViewModel.update(copiedChattingData);
        props.setChatUpdateState(copiedChattingData);
    }

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            addChattingData(inputChattingContent); // Enter 입력이 되면 클릭 이벤트 실행
            setInputChattingContent("");
        }
    };

    return(
        <div className="input-group">
            <input type="text" placeholder="Type a message" className="form-control py-3 bg-light" value={ inputChattingContent }
                onChange={e => setInputChattingContent(e.target.value)} onKeyPress={handleOnKeyPress}/>
            <Button onClick={ () => addChattingData(inputChattingContent) }> send </Button>
        </div>
    )
}
