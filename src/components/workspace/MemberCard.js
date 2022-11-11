import React from 'react'
import { ListGroup } from 'react-bootstrap'


export default function MemberCard({ profilePicture, name, role, onClicked}){
    return(
            <ListGroup.Item action onClick={ onClicked }>
                <img src={ profilePicture } alt="user" width="25" className="rounded-circle" />
                <span> &nbsp;{ name } </span> <span style={ { fontSize:'11px'}}> { role } </span>
            </ListGroup.Item>
    )
}