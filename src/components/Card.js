import React from 'react'
import { ListGroup } from 'react-bootstrap'


const Card = ({ profilePicture, name, role, onClicked}) => {
    return(
        <ListGroup>
            <ListGroup.Item action variant="danger" onClick={ onClicked }>
                <img src={ profilePicture } alt="user" width="25" className="rounded-circle" />
                <span> { name } </span> <span style={ { fontSize:'11px'}}> { role } </span>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default Card