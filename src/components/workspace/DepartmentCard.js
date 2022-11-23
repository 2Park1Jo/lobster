import React from 'react'
import './Card.css'

import { ListGroup } from 'react-bootstrap'


export default function DepartmentCard({ name, onClicked, uncheckedMessageCount}){
    if (uncheckedMessageCount === 0){
        uncheckedMessageCount = "";
    }
    return(
        <ListGroup.Item className='card' action onClick={ onClicked }>
            <div style={{width:'200px'}}>
                <div style={{float:'left', fontSize:'14px', fontFamily: 'Noto Sans CJK KR', fontStyle: 'normal', fontWeight: '400'}}>
                    { name }
                </div>
                <div style={{display:'inline-block', float:'right', fontSize:'14px', color:'#C61C1C', fontFamily: 'Noto Sans CJK KR', fontStyle: 'normal', fontWeight: '400'}}>
                    { uncheckedMessageCount }
                </div>
            </div>
        </ListGroup.Item>
    )
}
