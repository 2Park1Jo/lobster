import React from 'react'
import './Card.css'

import { Card, ListGroup } from 'react-bootstrap'


export default function DepartmentCard({ name, onClicked, uncheckedMessageCount}){
    if (uncheckedMessageCount === 0){
        uncheckedMessageCount = "";
    }
    return(
        <ListGroup.Item className='card' action onClick={ onClicked }>
            <span style={{fontSize:'14px', fontFamily: 'Noto Sans CJK KR', fontStyle: 'normal', fontWeight: '400'}}>
                { name }
            </span>
            <span style={{marginLeft:'14px',fontSize:'14px', color:'#C61C1C', fontFamily: 'Noto Sans CJK KR', fontStyle: 'normal', fontWeight: '400'}}>
                { uncheckedMessageCount }
            </span>
        </ListGroup.Item>
    )
}
