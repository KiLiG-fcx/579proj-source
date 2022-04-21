//import logo from './logo.svg';
import React from "react";
import './App.css';
import './Style.css';
import Button from 'react-bootstrap/Button';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Icon } from "@blueprintjs/core";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useState,useRef} from 'react';
import { Form, InputGroup} from 'react-bootstrap';
import { Anniversary } from "./Aniversary";
import { Diary } from "./Diary";
import { SearchResult } from "./SearchResult";

function App() {
  document.body.style= 'background: #FFFADE;'
  let Akeynum = parseInt(localStorage.getItem('Akeynum')||0);
  let Dkeynum = parseInt(localStorage.getItem('Dkeynum')||0);
  // Anniversary
  const anniTitle = useRef();
  const anniDate = useRef();
  const anniNote = useRef();
  const anniColor = useRef();
  const [annivArray, setAnArray] = useState(ConstructAnnivArray); // construct from local storage
  // Diary
  const [diaryArray, setDiArray] = useState(ConstructDiaryArray); // construct from local storage
  const diaryTitle = useRef();
  const diaryDate = useRef();
  const diaryContent = useRef();
  const diaryColor = useRef();
  // search function
  const searchThing = useRef();
  const [searchResult, setSearchResult] = useState([]);
  // clear button display
  let clearbtn1 = <></>;
  if (annivArray.length){
    clearbtn1 = <Button variant="outline-danger" className="delbtn" onClick={clearanniv}>Clear All</Button>;
  }
  let clearbtn2 = <></>;
  if (diaryArray.length){
    clearbtn2 = <Button variant="outline-danger" className="delbtn" onClick={cleardiary}>Clear All</Button>;
  }

  function parseDateStr(anni_timestamp, curr_timestamp){
    if (curr_timestamp > anni_timestamp){
      return [Math.floor(Math.abs(curr_timestamp - anni_timestamp)/1000/3600/24), "passed"]
    } else{
      return [Math.ceil(Math.abs(curr_timestamp - anni_timestamp)/1000/3600/24), "left"]
    }
  }

  function TransformToStamp(timestr){
    const DateLst = timestr.split('-')
    var newDate = new Date(parseInt(DateLst[0]), parseInt(DateLst[1]-1), parseInt(DateLst[2]));
    return parseDateStr(newDate,Date.now());
  }

  function add_anni(){  // save variables to anniv array
    const title_array = JSON.parse(localStorage.getItem('anni_titles') || JSON.stringify([]));
    title_array.push(anniTitle.current.value); // push the new title value
    localStorage.setItem('anni_titles',JSON.stringify(title_array)); // update the title array
    const date_array = JSON.parse(localStorage.getItem('anni_dates')|| JSON.stringify([]));
    date_array.push(anniDate.current.value); // push the date value
    localStorage.setItem('anni_dates',JSON.stringify(date_array)); //update the date array
    const note_array = JSON.parse(localStorage.getItem('anni_notes') || JSON.stringify([]));
    note_array.push(anniNote.current.value); // push the new note value
    localStorage.setItem('anni_notes',JSON.stringify(note_array)); // update the note array
    const color_array = JSON.parse(localStorage.getItem('anni_colors') || JSON.stringify([])) ;
    color_array.push(anniColor.current.value);
    localStorage.setItem('anni_colors',JSON.stringify(color_array));
    // calculate how many days has passed/left
    const [timeint, hasPassed] = TransformToStamp(anniDate.current.value);
    // construct a new Anniversary object
    const NewAnniv = <Anniversary title={anniTitle.current.value}
    date={anniDate.current.value} note={anniNote.current.value}
    passedDay={timeint} key={Akeynum.toString()+"a"} hasPassed={hasPassed}
    num={Akeynum} color={anniColor.current.value}/>
    Akeynum += 1;
    localStorage.setItem('Akeynum',Akeynum)
    setAnArray(oarray => [...oarray,NewAnniv])
  }
  
  function add_di(){
    const title_array = JSON.parse(localStorage.getItem('diary_titles') || JSON.stringify([]));
    title_array.push(diaryTitle.current.value); // push the new title value
    localStorage.setItem('diary_titles',JSON.stringify(title_array));
    const date_array = JSON.parse(localStorage.getItem('diary_dates')|| JSON.stringify([]));
    date_array.push(diaryDate.current.value);
    localStorage.setItem('diary_dates',JSON.stringify(date_array));
    const content_array = JSON.parse(localStorage.getItem('diary_contents') || JSON.stringify([]));
    content_array.push(diaryContent.current.value);
    localStorage.setItem('diary_contents',JSON.stringify(content_array));
    const diary_array = JSON.parse(localStorage.getItem('diary_colors') || JSON.stringify([]));
    diary_array.push(diaryColor.current.value);
    localStorage.setItem('diary_colors',JSON.stringify(diary_array));
    const NewDiary = <Diary date={diaryDate.current.value} title={diaryTitle.current.value}
    content={diaryContent.current.value} key={Dkeynum.toString()+"d"}
    color={diaryColor.current.value}/>
    Dkeynum += 1;
    localStorage.setItem('Dkeynum',Dkeynum)
    setDiArray(oarray => [...oarray,NewDiary]);
  }

  function ConstructAnnivArray(){
    if (localStorage.getItem('anni_titles')==null){ 
      return []
    }
    else{
      let result = [];
      const len = JSON.parse(localStorage.getItem('anni_titles')).length;
      for (let i = 0; i < len; i++){
        const [newDateInterval, newhasPassed] = TransformToStamp(JSON.parse(localStorage.getItem('anni_dates'))[i]);
        const curr_anniv = <Anniversary title={JSON.parse(localStorage.getItem('anni_titles'))[i]}
        date={JSON.parse(localStorage.getItem('anni_dates'))[i]}
        note={JSON.parse(localStorage.getItem('anni_notes'))[i]}
        color={JSON.parse(localStorage.getItem('anni_colors'))[i]}
        passedDay={newDateInterval}
        hasPassed={newhasPassed}
        key={i}
        />
        result.push(curr_anniv);
      }
      return result;
    }
  }

  function ConstructDiaryArray(){
    if (localStorage.getItem('diary_titles')==null){
      return []
    }
    else{
      let result = [];
      const len = JSON.parse(localStorage.getItem('diary_titles')).length;
      for (let i = 0; i < len; i++){
        const curr_diary = <Diary date={JSON.parse(localStorage.getItem('diary_dates'))[i]}
        title={JSON.parse(localStorage.getItem('diary_titles'))[i]}
        content={JSON.parse(localStorage.getItem('diary_contents'))[i]}
        color={JSON.parse(localStorage.getItem('diary_colors'))[i]}
        key={i}/>
        result.push(curr_diary);
      }
      return result;
    }
  }

  function searchDate(){
    setSearchResult([])
    let ann_index = [];
    let di_index = [];
    for (let i=0; i < JSON.parse(localStorage.getItem('anni_dates')).length; i++){
      if (JSON.parse(localStorage.getItem('anni_dates'))[i] === searchThing.current.value){
        ann_index.push(i)
      }
    }
    for (let i=0; i < JSON.parse(localStorage.getItem('diary_dates')).length; i++){
      if (JSON.parse(localStorage.getItem('diary_dates'))[i] === searchThing.current.value){
        di_index.push(i)
      }
    }
    if(ann_index.length===0 && di_index.length===0){
      setSearchResult(['No result'])
      return
    }
    ann_index.forEach((i) => {
      const Result = <SearchResult category="Anniversary" 
      title={JSON.parse(localStorage.getItem('anni_titles'))[i]}
      key={i.toString()+"a"}/>
      setSearchResult(oarray => [...oarray,Result])
    } )
    di_index.forEach((i) => {
      const Result = <SearchResult category="Diary"
      title={JSON.parse(localStorage.getItem('diary_titles'))[i]}
      key={i.toString()+"d"}/>
      setSearchResult(oarray => [...oarray,Result])
    })
  }

  function clearanniv(){
    setAnArray([]);
    localStorage.setItem('Akeynum',parseInt(0));
    localStorage.setItem('anni_titles',JSON.stringify([]));
    localStorage.setItem('anni_dates',JSON.stringify([]));
    localStorage.setItem('anni_notes',JSON.stringify([]));
    localStorage.setItem('anni_colors',JSON.stringify([]));
  }

  function cleardiary(){
    setDiArray([])
    localStorage.setItem('Dkeynum',parseInt(0))
    localStorage.setItem('diary_titles',JSON.stringify([]));
    localStorage.setItem('diary_dates',JSON.stringify([]));
    localStorage.setItem('diary_contents',JSON.stringify([]));
    localStorage.setItem('diary_colors',JSON.stringify([]));
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="container">
        <h1 className="main-title">My Memories</h1>
        <div className="add-new">
          <Popup trigger={<Button variant="outline-dark" className="main-btn">
              <Icon iconSize={20} icon="plus"></Icon> Add a memorable day
            </Button>} modal>
            <h3 className="form-title">Add a memorable day</h3>
            <Form.Label htmlFor="titleInput">Anniversary Title</Form.Label>
            <Form.Control type="text" id="titleInput" ref={anniTitle}/>
            <Form.Label htmlFor='annidate-input'>Date</Form.Label>
            <Form.Control className="form-control" type="date" id="annidate-input" 
                            aria-label="Date" ref={anniDate}/>
            <Form.Label htmlFor="anninote-input">Notes</Form.Label>
            <Form.Control className="form-control" as="textarea" rows={1} id='anninote-input' ref={anniNote}/>
            <Form.Label htmlFor="anniColorInput">Choose a background color</Form.Label>
            <Form.Control type="color"
              id="anniColorInput" defaultValue="#ffffff"
              title="Choose your color" ref={anniColor}
            />
            <Button variant="outline-dark" className="addBtn"
            onClick={add_anni}>
                  <Icon iconSize={20} icon="plus"></Icon>Submit
            </Button>
          </Popup>

          <Popup trigger={<Button variant="outline-dark" className="main-btn">
              <Icon iconSize={20} icon="plus"></Icon>Write a diary
            </Button>
          } modal>
            <h3 className="form-title">Write a diary</h3>
            <div className="add-new">
                <Form.Label htmlFor="titleInput">Diary Title</Form.Label>
                <Form.Control type="text" id="titleInput"
                  placeholder='Untitled' ref={diaryTitle}/>
              <Form.Label htmlFor='diarydate_input'>Date</Form.Label>
              <Form.Control type="date" id="diaydate_input" aria-label="Date" ref={diaryDate}/>
              <Form.Label htmlFor="contentInput">What happened today?</Form.Label>
                  <Form.Control as="textarea" rows={4} ref={diaryContent}/>
              <Form.Label htmlFor="anniColorInput">Choose a background color</Form.Label>
              <Form.Control type="color"
                id="anniColorInput" defaultValue="#ffffff"
                title="Choose your color" ref={diaryColor}/>
            </div>
            <Button variant="outline-dark" className="addBtn" onClick={add_di}>
              <Icon iconSize={20} icon="plus"></Icon>Submit
            </Button>
          </Popup>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search" type="date" aria-label="search" 
            ref={searchThing} id="search-bar" onChange={searchDate}/>
            <Popup trigger={<Button variant="outline-dark">
              <Icon iconSize={20} icon="search"></Icon>Search Date</Button>}>
              {searchResult}
            </Popup>
          </InputGroup>
        </div>
         <h2 className="category-title">
           <Icon iconSize={40} icon="timeline-events"></Icon>  Anniversary</h2>
        <div className='anni-container'>{annivArray}
        </div>
        {clearbtn1}
        <h2 className="category-title">
        <Icon iconSize={40} icon="book"></Icon>  Diary</h2>
        <div className='diary-container'>
            {diaryArray}
        </div>
        {clearbtn2}
      </main>
    </div>
  );
}

export default App;
