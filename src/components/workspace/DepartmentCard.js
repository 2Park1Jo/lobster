import React from 'react'
import { ListGroup } from 'react-bootstrap'


export default function DepartmentCard({ name, onClicked}){
    return(
        <ListGroup.Item style={{backgroundColor:'rgb(250, 250, 250)'}} action onClick={ onClicked }>
            { name }
        </ListGroup.Item>
    )
}
