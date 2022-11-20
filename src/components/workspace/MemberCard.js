import React from 'react'
import './Card.css'
import { ListGroup } from 'react-bootstrap'
import {IoPersonCircle} from "react-icons/io5";


export default function MemberCard({ profilePicture, name, email, role, onClicked}){
    return(
        localStorage.getItem('loginMemberEmail').includes(email) ?

        <ListGroup.Item className='card' action onClick={ onClicked }>
            <IoPersonCircle style={{fontSize:'29px', marginRight:'7px', color:'#C61C1C'}} />
            <span style={ { fontSize:'14px', fontWeight:'400', color:'#616161'}}>{ name }</span> <span style={ { fontSize:'11px'}}> { role } </span>
        </ListGroup.Item>   
        :
        <ListGroup.Item className='card' action onClick={ onClicked }>
            <IoPersonCircle style={{fontSize:'29px', marginRight:'7px', color:'#717171'}} />
            <span style={ { fontSize:'14px', fontWeight:'400', color:'#616161'}}>{ name }</span> <span style={ { fontSize:'11px'}}> { role } </span>
        </ListGroup.Item>
    )
}