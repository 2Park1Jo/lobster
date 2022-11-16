import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { BiPaperPlane } from "react-icons/bi";
import { FileUploader } from "react-drag-drop-files";
import Dropzone from 'react-dropzone'



const fileTypes = ["JPG", "PNG", "GIF"];
export default function ChatInputBox(props){
    let [inputChattingContent, setInputChattingContent] = useState(""); // 사용자가 입력한 채팅 컨텐츠 데이터
    let [drag,setDrag]=useState(false)

    function scrollToBottom(behavior) {
        props.messageEnd.current?.scrollIntoView({behavior: behavior})
    }

    useEffect( () => {
        scrollToBottom("smooth");
    }, [props.chatUpdateState])

    useEffect( () => {
        if(inputChattingContent === '\n'){
            setInputChattingContent("");
        }
    },[inputChattingContent])

    const handleChange = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
    
        reader.onload = (e) => {
            const file = e.target.result;
        };
    
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    };
    

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
        <>
        <div className="input-group px-1">
            <textarea placeholder="Type a message" className="form-control bg-light" value={ inputChattingContent }
                onChange={e => setInputChattingContent(e.target.value)} onKeyPress={handleOnKeyPress}/>
            <Button variant="secondary" onClick={ () => addChattingData(inputChattingContent) }> {<BiPaperPlane style={{fontSize:'20px'}}/>} </Button>
        </div>
        {/* <input type="file" name="input" onChange={handleChange} /> */}
        </>
    )
}
