import React from 'react'
import './Card.css'

import { Card, ListGroup } from 'react-bootstrap'


export default function DepartmentCard({ name, onClicked}){
    return(
        <ListGroup.Item className='card' action onClick={ onClicked }>
            <span style={ { marginLeft:'6px', fontSize:'14px', fontFamily: 'Noto Sans CJK KR', fontStyle: 'normal', fontWeight: '400'}}>
                { name }
            </span>
        </ListGroup.Item>
    )
}
