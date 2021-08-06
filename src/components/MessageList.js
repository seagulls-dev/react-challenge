import React, {Component, useEffect, useState, useRef} from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import {createUseStyles} from 'react-jss'

import MessageItem from "./MessageItem";

const useStyle = createUseStyles({

});

const MessageList = props => {
  const classes = useStyle();
  const [messages, setMessages] = useState([]);

  const [errorList, setErrorList] = useState([]);
  const [warningList, setWarningList] = useState([]);
  const [infoList, setInfoList] = useState([]);
  const [api] = useState(new Api({
    messageCallback: (msg) => {
      messageCallback(msg);
    },
  }))

  useEffect(()=>{
    api.start();
  },[])

  function messageCallback(msg) {
    messages.push(msg);
    setMessages([...messages]);
    console.log(messages);
    switch (msg.priority) {
      case 1 :
        errorList.push(msg);
        setErrorList([...errorList]);
        break;
      case 2 :
        warningList.push(msg);
        setWarningList([...warningList]);
        break;
      case 3 :
        infoList.push(msg);
        setInfoList([...infoList]);
        break;
    }
  }

  const renderButton = () => {
    const isApiStarted = api.isStarted()
    return (
      <Button
        variant="contained"
        onClick={() => {
          if (isApiStarted) {
            api.stop()
          } else {
            api.start()
          }
          //force update
          setMessages([...messages])
        }}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }


  return (
    <div>
      {renderButton()}
    </div>
  )

}

export default MessageList
