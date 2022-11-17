import React from 'react'
import { useRef } from 'react';
import { ListGroup } from 'react-bootstrap'
import './Message.css';
import { AiOutlineFileText } from "react-icons/ai";


export default function Message({ chatSender, chatDate, chatContent,chatType,link }){
    const inputRef = useRef(null);
    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };
    return(
        (
            chatType==="-1"? 
                <div className='message'>
                    <span className="small">({ chatDate.split(" ")[1] })&nbsp;{ chatContent } </span>
                </div>
            :(chatType==="0"?
                <div className='message'>
                    <li className="small text-muted">{ chatSender } { chatDate.split(" ")[1] }</li>
                    <ListGroup.Item style={{width: 'auto'}} action className="rounded">
                        <span className="small"> { chatContent } </span>
                    </ListGroup.Item>
                </div>
                :<div className='message'>
                <li className="small text-muted">{ chatSender } { chatDate.split(" ")[1] }</li>
                <div >               
                <ListGroup.Item style={{width: 'auto', float:"left"}} action className="rounded" onClick={handleClick}>
                    <AiOutlineFileText style={{fontSize:"40px"}}/>
                    <span className="small"> { chatContent } </span>
                    <a href={link} ref={inputRef} />
                </ListGroup.Item>
                </div>
            </div>)
        )   
    )
}
