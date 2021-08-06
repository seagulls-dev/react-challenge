import React, {Component, useEffect, useState, useRef} from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'

const MessageList = props => {
  const [messages, setMessages] = useState([])
  const [api] = useState(new Api({
    messageCallback: (msg) => {
      messageCallback(msg)
    },
  }))

  useEffect(()=>{
    api.start()
  },[])

  function messageCallback(msg) {
    messages.push(msg)
    setMessages([...messages])
    console.log(messages)
  }

  function renderButton() {
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
