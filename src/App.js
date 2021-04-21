import React, { useState, useEffect } from "react";
//import { useState } from "react";
import "./App.css";
import light from "./images/sun.png"
import darkthem from "./images/moon.png"

//import Filter from "./Components/Filter";

const App = () =>{
  const [dark, setDark] = useState(false);
  const URL = 'https://jobs.github.com/positions.json?';
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [now, setnow] = useState(false);
  const [discription, setDiscription] = useState("");
  const [location, setLocation] = useState("");
  const [full, setFull] = useState(false);
  const [job, setJob] = useState(true);
  console.log(location)
  const loadonce = () => {
    fetch(URL)
    .then(response => response.json())
    .then(data => setData(data));
    console.log(data)
  }
  //console.log(data);
  useEffect(()=>{
    loadonce();  
  },[now])
  const loaddata = () =>{
    //console.log(URL+'?description='+discription+'&full_time='+full+'&location='+location);
    //https://jobs.github.com/positions.json?description=amazon&full_time=true&location=california
    fetch(URL+'?description='+discription+'&full_time='+full+'&location='+location)
    .then(response => response.json())
    //.then(data => console.log("new data",data))
    .then(data => setData(data))
    //console.log(URL+'?description='+discription);
    //console.log(data)
  } 
  const details = (e) =>{
    //console.log(e);
    setDetail(e);
    setJob(false);
  }
  return (
    <div className={dark? "Darkapp" : "App"}>
      <header className={"header"}>
        <h3>GitHub Jobs</h3>
        <div style={{display:"flex",margin:"5px"}} >
        <img src={light} style={{height: "25px",margin:" 0px 5px"}} alt="dark"></img>
        <label className="switch">
          <input type="checkbox" onChange={e=>setDark(!dark)}></input>
          <span className="slider round"></span>
        </label>
        <img src={darkthem} style={{height: "25px",margin:" 0px 5px"}} alt="dark"></img>
        </div>
      </header>
      {job &&
      (<div className={dark? "dark filter" : "filter"}>  
        <i className='fas fa-search'><input className="filterinput" type="text" placeholder="Filter by title company" onChange={e => setDiscription(e.target.value)} value={discription}></input></i>
        <i className="material-icons">location_on<input className="filterinput" type="text" placeholder="Filter by location" onChange={e => setLocation(e.target.value)} value={location}></input></i>
          <label>Full Time Only<input type="checkbox" label="Full Time Only" onChange={e=>setFull(!full)}></input></label>
          <button onClick={loaddata}>Search</button>
      </div>)}
      { job? (
      <div> <div className="list">{data.map(item => (
              <div className="card" key={item.id}>
              <div className={dark? "dark innercard" : "innercard"}>
                  <div style={{ height: "50px"}}><img src={item.company_logo} alt="logo"></img></div>
                  <li>{item.type}</li>
                  <b>{item.title}</b>
                  <p>{item.company}</p>
                  <p style={{color: "blue"}}>{item.location}</p>
                  <button className="button" onClick={() => details(item)}>Details</button>
              </div>
          </div>))}</div>
      </div>):(
        <div className={dark?"dark detail": "detail"}>
          <div className="topbutton"><button className="button" onClick={()=>setJob(true)}>Back</button></div>
          <div>
          <div className={dark? "dark head": "head"}>
            <img style={{ height: "50px"}} src={detail.company_logo}></img> 
            <h3>{detail.company}</h3> 
            <a href={detail.company_url} className="button">Vist</a>
          </div>
          <div className={dark? "dark detailbody" : "detailbody"}>
            <h3>{detail.title}</h3>
            <p>{detail.location} / {detail.type}</p>
            <div className=""
            dangerouslySetInnerHTML={{
              __html: detail.description
          }}/>
          <div className=""
            dangerouslySetInnerHTML={{
              __html: detail.how_to_apply
          }}/>
          <a href={detail.url} className="button">Apply</a>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
