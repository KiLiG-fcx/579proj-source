import React from "react";
import {Card} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button';
import './CardStyle.css'

export function Anniversary(props){
    function pluralize(num) {
        if(num === 1 || num === 0) {
            return '';
        } else {
            return 's';
        }
    }
    return (<Card className="anniversary-card" style={{backgroundColor:props.color}}>
        <Card.Header className="cards-header"> {props.title} </Card.Header>
        <Card.Body>
        <Card.Title className="anniv-title">{props.passedDay} day{pluralize(props.passedDay)} {props.hasPassed}</Card.Title>
        <Card.Subtitle className="cards-sub">Target Date: {props.date}</Card.Subtitle>
        <Popup trigger={<Button variant="dark" className="main-page-btn">See notes</Button>} modal>
            <Card>
                <Card.Header className="pop-title">{props.title}</Card.Header>
                <div className="pop-content">{props.note}</div>
            </Card>
        </Popup>
        </Card.Body>
    </Card>)
}