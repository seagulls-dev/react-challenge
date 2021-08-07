import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'
import {createUseStyles} from 'react-jss'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MessageItem from "./MessageItem";

const useStyle = createUseStyles({
    main: {
        flexGrow: 1
    },
    buttons: {
        textAlign: 'center'
    }
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

    useEffect(() => {
        api.start();
    }, [])

    const messageCallback = msg => {
        // const new_message = Object.assign(messages, []);
        // new_message.push(msg)
        // setMessages(new_message);
        switch (msg.priority) {
            case 1 :
                setErrorList(errorList => {
                    errorList.push(msg);
                    return [...errorList]
                });
                break;
            case 2 :
                setWarningList(warningList => {
                    warningList.push(msg);
                    return [...warningList]
                });
                break;
            case 3 :
                setInfoList(infoList => {
                    infoList.push(msg);
                    return [...infoList]
                });
                break;
        }
    }

    const removeAll = () => {
        setWarningList([]);
        setErrorList([]);
        setInfoList([]);
    }

    const renderButton = () => {
        const isApiStarted = api.isStarted()
        return (
            <>
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
                    style={{backgroundColor: "#88FCA3"}}
                >
                    {isApiStarted ? 'Stop' : 'Start'}
                </Button>
                <Button style={{backgroundColor: "#88FCA3", marginLeft: 20}} variant="contained" onClick={removeAll}>
                    Clear
                </Button>
            </>

        )
    }

    const handleRemove = (idx, type) => {
        switch (type) {
            case 1 :
                errorList.splice(idx, 1);
                setErrorList([...errorList]);
                break;
            case 2 :
                warningList.splice(idx, 1);
                setWarningList([...warningList]);
                break;
            case 3 :
                infoList.splice(idx, 1);
                setInfoList([...infoList]);
                break;
        }
        setMessages([...messages])
    }

    return (
        <React.Fragment>
            <Container fixed maxWidth="lg">
                <div className={classes.buttons}>
                    {renderButton()}
                </div>
                <div className={classes.main}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            {
                                errorList.map((list, index) => (
                                    <MessageItem content={list.message} type={list.priority} key={index} idx={index}
                                                 removes={(idx) => handleRemove(idx, 1)}/>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            {
                                warningList.map((list, index) => (
                                    <MessageItem content={list.message} type={list.priority} key={index} idx={index}
                                                 removes={(idx) => handleRemove(idx, 2)}/>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            {
                                infoList.map((list, index) => (
                                    <MessageItem content={list.message} type={list.priority} key={index} idx={index}
                                                 removes={(idx) => handleRemove(idx, 3)}/>
                                ))
                            }
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )

}

export default MessageList
