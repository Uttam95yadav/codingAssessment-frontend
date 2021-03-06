import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import OutPut from "./OutPut";
import {Button, Form,Alert} from 'react-bootstrap';

function LandingPage() {
  const url = "http://localhost:8080/codingasessment/frequencyandsimilarwords"
  const [showOutPut, setShowOutPut] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState({
    word: "",
    notebookText: "",
  });
  const [data, setData] = useState({
    word: "",
    notebookText: "",
  })

  function handle(e) {
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  function onsubmit(e) {
    e.preventDefault();
    try {
      Axios.post(url, data)
      .then(res => {
        console.log(res)
        if(res.status === 200){
          setResult(res.data.response)
          setShowOutPut(true)
          setShowError(false)
        }
        else {
          setShowOutPut(false);
          setShowError(true);
        }
      })
    }catch (err) {
      console.log(err);
      setShowOutPut(false);
      setShowError(true);
    }
  }

  return (
      <div>
        <Form className='text-form' onSubmit={(event => onsubmit(event))}>
          <h2>
            <span>Frequency And Similar Word</span><br/><br/>
          </h2>
          <Form.Group >
            <Form.Label>Enter the Word </Form.Label>
            <Form.Control placeholder = 'word' onChange={(e) => handle(e)} id="word" value={data.word}
                          type="text" required/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notebook Text</Form.Label>
            <Form.Control placeholder = 'Notebook Text' onChange={(e) => handle(e)} id="notebookText"
                          value={data.notebookText} as="textarea" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {showOutPut ? <OutPut result={result}></OutPut> : null}
          {showError? <Alert>Error While Getting Result </Alert>: null}
        </Form>
      </div>
  );

}

export default LandingPage