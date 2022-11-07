import React from 'react'
import { ListGroup } from 'react-bootstrap'


export default function DepartmentCard({ name, onClicked}){
    return(
        <ListGroup>
            <ListGroup.Item action variant="secondary" onClick={ onClicked }>
                { name }
            </ListGroup.Item>
        </ListGroup>
    )
}
