import React from 'react'
import { ListGroup } from 'react-bootstrap'


export default function DepartmentCard({ name, onClicked}){
    return(
        <ListGroup.Item action onClick={ onClicked }>
            { name }
        </ListGroup.Item>
    )
}
