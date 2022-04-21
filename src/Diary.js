import React from "react";
import {Card} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import './CardStyle.css'

export function Diary(props){
    return (<Card className="diary-card" style={{ backgroundColor: props.color}}>
        <Card.Header className="cards-header">{props.date}</Card.Header>
        <Card.Body>
            <Card.Title className="diary-title">{props.title}</Card.Title>
        <Popup trigger={<Button variant="dark" className="main-page-btn">See content</Button>} modal>
            <Card>
                <Card.Header className="pop-title">{props.date}</Card.Header>
                <div className="pop-content">{props.content}</div>
            </Card>
        </Popup>
        </Card.Body>
    </Card>)
}