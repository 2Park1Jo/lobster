import React from 'react'
import { ListGroup } from 'react-bootstrap'


export default function Message({ chatSender, chatDate, chatContent }){
    return(
        <div>
            <li className="small text-muted">{ chatSender } { chatDate }</li>
            <ListGroup.Item style={{width: 'auto'}} action className="rounded">
                <span className="small"> { chatContent } </span>
            </ListGroup.Item>
        </div>
    )
}
