import React from 'react'
import { ListGroup } from 'react-bootstrap'
import './Message.css';


export default function Message({ chatSender, chatDate, chatContent }){
    return(
        (
            chatSender === null || chatSender === "" ? 
                <>
                    &nbsp;
                    <p className="small">({ chatDate.split(" ")[1] })&nbsp;{ chatContent } </p>
                </>
            :
                <div className='message'>
                    <li className="small text-muted">{ chatSender } { chatDate.split(" ")[1] }</li>
                    <ListGroup.Item style={{width: 'auto'}} action className="rounded">
                        <span className="small"> { chatContent } </span>
                    </ListGroup.Item>
                </div>
        )   
    )
}
