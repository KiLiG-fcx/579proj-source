import React from "react";
import { ListGroup } from 'react-bootstrap';

export function SearchResult(props){
    return(
        <ListGroup.Item><b>{props.category}:</b> {props.title}</ListGroup.Item>
    )
}